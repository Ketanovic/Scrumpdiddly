from fastapi import APIRouter
from queries.recipes import RecipeQueries
import requests

router = APIRouter()


def list_all_recipes():
    queries = RecipeQueries()
    letters = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "r",
        "s",
        "t",
        "v",
        "w",
        "y",
    ]

    for letter in letters:
        api_url = (
            "https://www.themealdb.com/api/json/v1/1/search.php?f=" + letter
        )
        response = requests.get(api_url)
        data = response.json()
        recipe_list = data["meals"]
        for recipe in recipe_list:
            ing_dict = {}
            for j in range(len(recipe_list)):
                ing_list = []
                measure_list = []
                for i in range(1, 21):
                    recipe = data["meals"][j]
                    if (
                        data["meals"][j]["strIngredient" + str(i)] != ""
                        and data["meals"][j]["strIngredient" + str(i)] is not None
                    ):
                        recipe_ingredients = data["meals"][j][
                            "strIngredient" + str(i)
                        ]
                        ing_list.append(recipe_ingredients)
                    if (
                        data["meals"][j]["strMeasure" + str(i)] != ""
                        and data["meals"][j]["strMeasure" + str(i)] is not None
                    ):
                        recipe_measurements = data["meals"][j][
                            "strMeasure" + str(i)
                        ]
                        measure_list.append(recipe_measurements)
                ing_dict = {
                    ing_list: measure_list
                    for ing_list, measure_list in zip(ing_list, measure_list)
                }
                encoder = {
                    "name": recipe["strMeal"].replace(",", " "),
                    "category": recipe["strCategory"],
                    "area": recipe["strArea"],
                    "instructions": recipe["strInstructions"],
                    "ingredients": ing_dict,
                    "thumbnail": recipe["strMealThumb"],
                }
                queries.create(encoder)


list_all_recipes()
