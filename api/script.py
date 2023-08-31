from queries.ingredients import IngredientQueries
from fastapi import APIRouter
import requests

router = APIRouter()

queries = IngredientQueries


def create_ingredients():
    queries = IngredientQueries()
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
        ing_dict = {}
        for j in range(len(data["meals"])):
            for i in range(1, 21):
                if (
                    data["meals"][j]["strIngredient" + str(i)] != ""
                    and data["meals"][j]["strIngredient" + str(i)] is not None
                ):
                    checker = data["meals"][j]["strIngredient"
                                               + str(i)].upper()
                    if "EGG" in checker and checker != "EGG PLANTS":
                        ing_dict["name"] = "EGG"
                        ing_dict["recipe"] = []
                        if data["meals"][j]["strMeal"] is not None:
                            ing_dict["recipe"].append(
                                data["meals"][j]["strMeal"].upper()
                                )
                            # call queries.create on single ingredient
                            queries.create(ing_dict)
                    elif "FLOUR" in checker:
                        ing_dict["name"] = "FLOUR"
                        ing_dict["recipe"] = []
                        if data["meals"][j]["strMeal"] is not None:
                            ing_dict["recipe"].append(
                                data["meals"][j]["strMeal"].upper()
                                )
                            # call queries.create on single ingredient
                            queries.create(ing_dict)
                    elif "CHICKEN" in checker:
                        ing_dict["name"] = "CHICKEN"
                        ing_dict["recipe"] = []
                        if data["meals"][j]["strMeal"] is not None:
                            ing_dict["recipe"].append(
                                data["meals"][j]["strMeal"].upper()
                                )
                            # call queries.create on single ingredient
                            queries.create(ing_dict)
                    elif "ONION" in checker:
                        ing_dict["name"] = "ONION"
                        ing_dict["recipe"] = []
                        if data["meals"][j]["strMeal"] is not None:
                            ing_dict["recipe"].append(
                                data["meals"][j]["strMeal"].upper()
                                )
                            # call queries.create on single ingredient
                            queries.create(ing_dict)
                    elif "APPLE" in checker:
                        ing_dict["name"] = "APPLE"
                        ing_dict["recipe"] = []
                        if data["meals"][j]["strMeal"] is not None:
                            ing_dict["recipe"].append(
                                data["meals"][j]["strMeal"].upper()
                                )
                            # call queries.create on single ingredient
                            queries.create(ing_dict)
                    elif "SUGAR" in checker:
                        ing_dict["name"] = "SUGAR"
                        ing_dict["recipe"] = []
                        if data["meals"][j]["strMeal"] is not None:
                            ing_dict["recipe"].append(
                                data["meals"][j]["strMeal"].upper()
                                )
                            # call queries.create on single ingredient
                            queries.create(ing_dict)

                    else:
                        ing_dict["name"] = data["meals"][j]["strIngredient"
                                                            + str(i)].upper()
                        ing_dict["recipe"] = []
                        if data["meals"][j]["strMeal"] is not None:
                            ing_dict["recipe"].append(
                                data["meals"][j]["strMeal"].upper()
                                )
                            # call queries.create on single ingredient
                            queries.create(ing_dict)
                            # ing_list.append(ing_dict)
                            ing_dict = {}
                        else:
                            continue
    # try:
    #     print(ing_list)
    #     return queries.create(ing_list)
    # except DuplicateIngredientError:
    #     pass


create_ingredients()
