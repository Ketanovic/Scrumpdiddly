from fastapi import (
    APIRouter,
    Depends,
)
from models import (
    Recipes,
    RecipeIn,
    RecipeName
)
from queries.recipes import RecipeQueries

router = APIRouter()


@router.post("/api/recipes/one")
def get_recipe(
    info: RecipeName,
    queries: RecipeQueries = Depends(),
):
    recipe = queries.get(info)

    return {
        "name": recipe["name"],
        "category": recipe["category"],
        "area": recipe["area"],
        "instructions": recipe["instructions"],
        "ingredients": recipe["ingredients"],
        # "thumbnail": recipe["thumbnail"],
    }


@router.get("/api/recipes", response_model=Recipes)
def list_recipe(queries: RecipeQueries = Depends()):
    sort = queries.find_all()
    return {"recipes": sort}


@router.post("/api/recipes", response_model=RecipeIn)
async def create_recipe(
    info: RecipeIn,
    queries: RecipeQueries = Depends(),
):
    recipe = queries.create(info)

    return recipe
