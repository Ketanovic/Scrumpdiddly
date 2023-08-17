from fastapi import (
    APIRouter,
    Depends,
    Request,
    Response,
    HTTPException,
    status,
)
from models import Recipe, RecipeForm, RecipeIn, r
from queries.accounts import RecipeQueries, DuplicateRecipeError

router = APIRouter()


@router.post("/api/recipes")
async def create_account(
    info: RecipeIn,
    request: Request,
    response: Response,
    queries: RecipeQueries = Depends(),
):
    try:
        recipe = queries.create(info)
    except DuplicateRecipeError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Recipe has already been made",
        )
    form = RecipeForm(
        name=info.name,
        category=info.category,
        area=info.area,
        instructions=info.instructions,
        ingredients=info.ingredients,
        thumbnail=info.thumbnail
        )
    return Recipe(account=account, **token.dict())


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: AccountOut = Depends(authenticator.try_get_current_account_data),
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookie[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }
