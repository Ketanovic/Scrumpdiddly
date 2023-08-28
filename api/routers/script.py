from fastapi import (
    APIRouter,
    Depends
)

from queries.recipes import RecipeQueries
import requests


router = APIRouter()


def list_all_recipes(
    queries: RecipeQueries = Depends(),
):
    letters = [
        "a",
        "b",
        "c",
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
    recipe_list = []
    for letter in letters:
        api_url = (
            "http://www.themealdb.com/api/json/v1/1/search.php?f=" + letter
            )
        response = requests.get(api_url)
        data = response.json()
        print(data)
        for j in data["meals"]:
            recipe_list.append(j)
        for recipe in recipe_list:
            print(recipe)
            encoder = {
                "name": recipe["strMeal"],
                "category": recipe["strCategory"],
                "area": recipe["strArea"],
                "instructions": recipe["strInstructions"],
                # "ingredients": recipe["strIngredient1"],
                # "thumbnail": recipe["strImageSource"],
            }
            print("eeeeeeeeeecondeeeeeeeeeeerrrr", encoder)
            queries.create(encoder)


list_all_recipes()
