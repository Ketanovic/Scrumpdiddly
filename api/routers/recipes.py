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
)
from queries.recipes import RecipeQueries
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
        "ingredients": recipe["ingredients"],
        "thumbnail": recipe["thumbnail"],
    }


@router.get("/api/recipes", response_model=Recipes)
def list_recipe(queries: RecipeQueries = Depends()):
    api_url = "https://www.themealdb.com/api/json/v2/9973533/latest.php"
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
        ingredients=info.ingredients,
        thumbnail=info.thumbnail,
    )
    return recipe


@router.post("/api/api", response_model=Recipes)
async def list_all_recipes(
    queries: RecipeQueries = Depends(),
):
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
    recipe_list = []
    api_url = "https://www.themealdb.com/api/json/v2/9973533/latest.php"
    response = requests.get(api_url)
    data = response.json()
    print(data)
    for j in data["meals"]:
        recipe_list.append(j)
    for recipe in recipe_list:
        queries.create(recipe)
    return queries.find_all
