from authenticator import authenticator
from fastapi import APIRouter, Depends

router = APIRouter()


@router.post("/api/things")
async def create_thing(
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    pass
