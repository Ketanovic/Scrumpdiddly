from fastapi import (
    APIRouter,
    Depends,
    Request,
    Response,
    HTTPException,
    status,
)
from models import IngredientIn, IngredientOut, Ingredients
from queries.ingredients import IngredientQueries, DuplicateIngredientError
import requests

router = APIRouter()

@router.get("/api/ingredients", response_model=Ingredients)
def list_ingredients(
    queries: IngredientQueries = Depends(),
):
    return {"ingredients": queries.find_all()}
