from fastapi import (
    APIRouter,
    Depends
)
from models import (
    Recipes,
    RecipeIn,
    RecipeName,
    RecipeOut
)
from queries.recipes import RecipeQueries

router = APIRouter()


@router.post('/api/recipes/search', response_model=RecipeOut)
def search_recipe(
    info: RecipeName,
    queries: RecipeQueries = Depends(),
):

    return queries.get(info)


@router.get('/api/recipes/{id}', response_model=RecipeOut)
def get_recipe(
    id: str,
    queries: RecipeQueries = Depends(),
):
    return queries.get_one(id=id)


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
