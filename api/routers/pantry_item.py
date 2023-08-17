from fastapi import (
    APIRouter,
    Depends,
    Request,
    Response,
    HTTPException,
    status,
)
from models import PantryItemIn, PantryItemOut, PantryItems
from queries.pantry_item import PantryItemQueries


router = APIRouter()

@router.get("/api/pantry_item", response_model=PantryItems)
def list_pantry_items(
    q: str | None = None,
    queries: PantryItemQueries = Depends()
):
    return {
        "pantry items": queries.find_all()
    }

@router.post("/api/pantry_item", response_model=PantryItemOut)
def create_pantry_item(
    pantry_item_in: PantryItemIn,
    queries: PantryItemQueries = Depends()
):
    return queries.create(pantry_item_in=pantry_item_in)