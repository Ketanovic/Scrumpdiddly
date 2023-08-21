from fastapi import (
    APIRouter,
    Depends,
    Request,
    Response,
    HTTPException,
    status,
)
from models import IngredientIn, IngredientOut, Ingredients
from queries.ingredients import IngredientQueries, DuplicateIngredientError
import requests

router = APIRouter()

@router.post("/api/ingredients", response_model=IngredientOut)
async def create_ingredients(
    # info: IngredientIn,
    queries: IngredientQueries = Depends(),
):
    api_url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata'
    response = requests.get(api_url)
    data = response.json()
    ing_list = []
    ing_dict = {}
    for i in range(1, 21):
        if data["meals"][0]['strIngredient'+str(i)] != "" and data["meals"][0]['strIngredient'+str(i)] != None:
            ing_dict["name"] = (data["meals"][0]['strIngredient'+str(i)])
            ing_list.append(ing_dict)
            ing_dict = {}
    try:
        return queries.create(ing_list)
    except DuplicateIngredientError:
        pass

@router.get("/api/ingredients", response_model=Ingredients)
def list_ingredients(
    q: str | None = None,
    queries: IngredientQueries = Depends()
):
    return {
        "ingredients": queries.find_all()
    }
