from fastapi import (
    APIRouter,
    Depends,
    Request,
    Response,
    HTTPException,
    status,
)
from models import RecipeForm, RecipeIn, RecipeOut
from queries.recipes import RecipeQueries
import requests

router = APIRouter()


@router.get("/api/recipes", response_model=RecipeOut)
async def show_recipes(
    response: Response,
    queries: RecipeQueries = Depends()
):
    recipes = queries.list_all
    print("aaaaaaaaaaaaaaaaaa", type(recipes))
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
