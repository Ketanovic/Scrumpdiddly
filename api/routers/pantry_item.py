from fastapi import APIRouter, Depends
from authenticator import authenticator
from models import PantryItemIn, PantryItemOut, PantryItems, DeleteStatus
from queries.pantry_item import PantryItemQueries


router = APIRouter()


@router.get("/api/pantry_item", response_model=PantryItems)
def list_pantry_items(
    queries: PantryItemQueries = Depends(), account_data: dict = Depends(authenticator.get_current_account_data)
):
    return {"pantry_items": queries.find_all()}


@router.post("/api/pantry_item", response_model=PantryItemOut)
def create_pantry_item(
    pantry_item_in: PantryItemIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: PantryItemQueries = Depends(),
):
    return queries.create(pantry_item_in=pantry_item_in)


@router.delete("/api/pantry_item/{pantry_item_id}", response_model=DeleteStatus)
def delete_pantry_item(
    pantry_item_id: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: PantryItemQueries = Depends()
):
    return {"status": queries.delete(pantry_item_id=pantry_item_id)}
