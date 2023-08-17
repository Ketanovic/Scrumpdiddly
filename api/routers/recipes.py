from fastapi import (
    APIRouter,
    Depends,
    Request,
    Response,
    HTTPException,
    status,
)
from models import Recipe, RecipeForm, RecipeIn, RecipeOut
from queries.recipes import RecipeQueries
import requests

router = APIRouter()


@router.post("/api/recipes", response_model=RecipeOut)
async def show_recipes(
    recipe_data: dict = Depends(authenticator.get_current_account_data),
):
    pass


#     info: RecipeIn,
#     request: Request,
#     response: Response,
#     queries: RecipeQueries = Depends(),
# ):
#     try:
#         recipe = queries.create(info)
#     except DuplicateRecipeError:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Recipe has already been made",
#         )
#     form = RecipeForm(
#         name=info.name,
#         category=info.category,
#         area=info.area,
#         instructions=info.instructions,
#         ingredients=info.ingredients,
#         thumbnail=info.thumbnail,
#     )
#     return recipe


@router.get("/api/recipes/", response_model=Recipe)
async def get_recipe(self, name: str):
    recipe = self.collection.find_one({"name": name})
    recipe["id"] = str(recipe["_id"])
    return Recipe(**recipe)


@router.post("/api/recipes", response_model=Recipe)
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
        thumbnail=info.thumbnail,
    )
    content = (info, request, response, queries, form)
    return Recipe(recipe=recipe, **content.dict())
