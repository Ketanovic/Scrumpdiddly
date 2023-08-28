from pydantic import BaseModel
from typing import List
from jwtdown_fastapi.authentication import Token


class AccountForm(BaseModel):
    username: str
    password: str


class AccountIn(BaseModel):
    username: str
    password: str


class AccountOut(BaseModel):
    id: str
    username: str


class AccountOutWithHashedPassword(BaseModel):
    id: str
    username: str
    hashed_password: str


class AccountToken(Token):
    account: AccountOut


class RecipeForm(BaseModel):
    name: str
    category: str
    area: str
    instructions: str
    ingredients: dict
    # thumbnail: str


class RecipeIn(BaseModel):
    name: str
    category: str
    area: str
    instructions: str
    ingredients: dict
    # thumbnail: str


class RecipeOut(RecipeIn):
    # id: str
    name: str
    category: str
    area: str
    instructions: str
    ingredients: dict
    # thumbnail: str


class Recipes(BaseModel):
    recipes: List[RecipeOut]


class RecipeName(BaseModel):
    name: str


class RecipeNameForm(BaseModel):
    name: str


class PantryItemIn(BaseModel):
    name: str
    recipes: List


class PantryItemOut(PantryItemIn):
    id: str
    name: str
    recipes: List


class PantryItems(BaseModel):
    pantry_items: List[PantryItemOut]


class IngredientIn(BaseModel):
    name: str
    recipe: List


class IngredientOut(IngredientIn):
    name: str


class Ingredients(BaseModel):
    ingredients: List[IngredientOut]
