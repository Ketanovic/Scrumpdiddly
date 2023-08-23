from fastapi import (
    APIRouter,
    Depends,
    Request,
    Response,
    HTTPException,
    status,
)
from models import (
    Recipes,
    RecipeForm,
    RecipeIn,
    RecipeOut,
    RecipeNameForm,
    RecipeName,
    IngredientIn,
    IngredientOut,
    Ingredients,
)
from queries.recipes import RecipeQueries
from queries.ingredients import IngredientQueries, DuplicateIngredientError
import requests

router = APIRouter()


@router.post("/api/recipes/one")
def get_recipe(
    info: RecipeName,
    queries: RecipeQueries = Depends(),
):
    form = RecipeNameForm(name=info.name)
    recipe = queries.get(info)

    return {
        "name": recipe["name"],
        "category": recipe["category"],
        "area": recipe["area"],
        "instructions": recipe["instructions"],
        # "ingredients": recipe["ingredients"],
        # "thumbnail": recipe["thumbnail"],
    }


@router.get("/api/recipes", response_model=Recipes)
def list_recipe(queries: RecipeQueries = Depends()):
    return {"recipes": queries.find_all()}


@router.post("/api/recipes", response_model=RecipeIn)
async def create_recipe(
    info: RecipeIn,
    queries: RecipeQueries = Depends(),
):
    recipe = queries.create(info)
    form = RecipeForm(
        name=info.name,
        category=info.category,
        area=info.area,
        instructions=info.instructions,
        # ingredients=info.ingredients,
        # thumbnail=info.thumbnail,
    )
    return recipe


@router.post("/all")
async def create_ingredients():
    letters = [
        "a",
        # "b",
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
                    and data["meals"][j]["strIngredient" + str(i)] != None
                ):
                    checker = data["meals"][j][
                        "strIngredient" + str(i)
                    ].upper()
                    if "EGG" in checker and checker != "EGG PLANTS":
                        ing_dict["name"] = "EGG"
                        ing_dict["recipe"] = []
                        if data["meals"][j]["strMeal"] != None:
                            ing_dict["recipe"].append(
                                data["meals"][j]["strMeal"].upper()
                            )
                            # call queries.create on single ingredient

                    elif "FLOUR" in checker:
                        ing_dict["name"] = "FLOUR"
                        ing_dict["recipe"] = []
                        if data["meals"][j]["strMeal"] != None:
                            ing_dict["recipe"].append(
                                data["meals"][j]["strMeal"].upper()
                            )
                            # call queries.create on single ingredient

                    elif "CHICKEN" in checker:
                        ing_dict["name"] = "CHICKEN"
                        ing_dict["recipe"] = []
                        if data["meals"][j]["strMeal"] != None:
                            ing_dict["recipe"].append(
                                data["meals"][j]["strMeal"].upper()
                            )
                            # call queries.create on single ingredient

                    elif "ONION" in checker:
                        ing_dict["name"] = "ONION"
                        ing_dict["recipe"] = []
                        if data["meals"][j]["strMeal"] != None:
                            ing_dict["recipe"].append(
                                data["meals"][j]["strMeal"].upper()
                            )
                            # call queries.create on single ingredient

                    else:
                        ing_dict["name"] = data["meals"][j][
                            "strIngredient" + str(i)
                        ].upper()
                        ing_dict["recipe"] = []
                        if data["meals"][j]["strMeal"] != None:
                            ing_dict["recipe"].append(
                                data["meals"][j]["strMeal"].upper()
                            )
                        else:
                            continue

    print(ing_dict)
    # try:
    #     print(ing_list)
    #     return queries.create(ing_list)
    # except DuplicateIngredientError:
    #     pass


@router.post("/all_recipes")
async def list_all_recipes():
    queries = RecipeQueries()
    letters = [
        "a",
        # "b",
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
    recipe_list = []
    for letter in letters:
        api_url = (
            "http://www.themealdb.com/api/json/v1/1/search.php?f=" + letter
        )
        response = requests.get(api_url)
        data = response.json()
        for j in data["meals"]:
            recipe_list.append(j)
        for recipe in recipe_list:
            encoder = {
                "name": recipe["strMeal"],
                "category": recipe["strCategory"],
                "area": recipe["strArea"],
                "instructions": recipe["strInstructions"],
                # "ingredients": recipe["strIngredient1"],
                # "thumbnail": recipe["strImageSource"],
            }
            queries.create(encoder)


list_all_recipes()
