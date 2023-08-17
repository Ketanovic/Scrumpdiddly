from fastapi import (
    APIRouter,
    Depends,
    Request,
    Response,
    HTTPException,
    status,
)
from models import IngredientIn, IngredientOut, Ingredients
from queries.ingredients import IngredientQueries
import requests

router = APIRouter()


async def get_ingredients():
    api_url = 'https://www.themealdb.com/api/json/v1/1/random.php'
    response = requests.get(api_url)
    data = response.json()
    print(data)
    ing_list = []
    for i in range(1, 21):
        if data["meals"][0]['strIngredient'+str(i)] != "":
            ing_list.append(data["meals"][0]['strIngredient'+str(i)])
    print(ing_list)
    return ing_list

@router.post("/api/ingredients", response_model=IngredientOut)
def create_ingredient()
    #call get_ingredients func here.
#return list_ingredients funct.


@router.get("api/ingredients/", response_model=Ingredients)
def list_ingredients(
    q: str | None = None,
    queries: IngredientQueries = Depends()
):
    return {
        "ingredients": queries.find_all()
    }
