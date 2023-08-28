from fastapi import (
    APIRouter,
    Depends,
)
from models import Ingredients
from queries.ingredients import IngredientQueries

router = APIRouter()


@router.get("/api/ingredients", response_model=Ingredients)
def list_ingredients(
    queries: IngredientQueries = Depends(),
):
    return {"ingredients": queries.find_all()}
