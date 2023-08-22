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
    queries: IngredientQueries = Depends(),
):
    letters = [
        "a",
        "b",
        # "c",
        # "d",
        # "e",
        # "f",
        # "g",
        # "h",
        # "i",
        # "j",
        # "k",
        # "l",
        # "m",
        # "n",
        # "o",
        # "p",
        # "r",
        # "s",
        # "t",
        # "v",
        # "w",
        # "y",
    ]
    ing_list = []
    for letter in letters:
        api_url = "https://www.themealdb.com/api/json/v1/1/search.php?f=" + letter
        response = requests.get(api_url)
        data = response.json()
        ing_dict = {}
        for j in range(len(data["meals"])):
            for i in range(1, 21):
                if (
                    data["meals"][j]["strIngredient" + str(i)] != ""
                    and data["meals"][j]["strIngredient" + str(i)] != None
                ):
                    ing_dict["name"] = data["meals"][j]["strIngredient" + str(i)]
                    queries.create(ing_dict)
                    ing_dict = {}
                else:
                    continue
    # try:
    #     return queries.create(ing_list)
    # except DuplicateIngredientError:
    #     pass


@router.get("/api/ingredients", response_model=Ingredients)
def list_ingredients(
    # q: str | None = None,
    queries: IngredientQueries = Depends(),
):
    return {"ingredients": queries.find_all()}
