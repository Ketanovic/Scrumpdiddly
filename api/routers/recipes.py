from fastapi import (
    APIRouter,
    Depends,
    Request,
    Response,
    HTTPException,
    status,
)
from models import RecipeForm, RecipeIn, RecipeOut, RecipeNameForm, RecipeName, Recipes
from queries.recipes import RecipeQueries
import requests

router = APIRouter()


@router.get("/api/recipes", response_model=RecipeOut)
async def show_recipes(
    info: RecipeName,
    request: Request,
    response: Response,
    queries: RecipeQueries = Depends()
):
    form = RecipeNameForm(
        name=info.name
    )
    recipes = queries.find_one(info.name)
    print("aaaaaaaaaaaaaaaaaa", type(recipes))
    print(recipes)
    return recipes


# @router.get("/api/recipes/", response_model=RecipeOut)
# async def get_recipe(
#     info: RecipeOut,
#     request: Request,
#     response: Response,
#     queries: RecipeQueries = Depends(),
# ):
#     recipe = queries.get(info)
#     return recipe


@router.post("/api/recipes", response_model=RecipeIn)
async def create_recipe(
    info: RecipeIn,
    request: Request,
    response: Response,
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

@router.post("/api/recipes", response_model=Recipes)
def list_recipe(queries: RecipeQueries = Depends()):
    return {"recipes": queries.find_all()}