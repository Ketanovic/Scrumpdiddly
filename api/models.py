from pydantic import BaseModel
from typing import List
from jwtdown_fastapi.authentication import Token
from bson.objectid import ObjectId


class AccountForm(BaseModel):
    username: str
    password: str


class AccountIn(BaseModel):
    username: str
    email: str
    password: str


class AccountOut(BaseModel):
    id: str
    username: str
    email: str


class AccountOutWithHashedPassword(BaseModel):
    id: str
    username: str
    hashed_password: str
    email: str


class AccountToken(Token):
    account: AccountOut


class RecipeForm(BaseModel):
    name: str
    category: str
    area: str
    instructions: str
    ingredients: dict
    thumbnail: str


class RecipeIn(BaseModel):
    name: str
    category: str
    area: str
    instructions: str
    ingredients: dict
    thumbnail: str


class RecipeOut(RecipeIn):
    name: str
    category: str
    area: str
    instructions: str
    ingredients: dict
    thumbnail: str


class RecipeOutList(RecipeIn):
    id: str
    name: str
    category: str
    area: str
    instructions: str
    ingredients: dict
    thumbnail: str


class Recipes(BaseModel):
    recipes: List[RecipeOutList]


class RecipeName(BaseModel):
    name: str


class RecipeNameForm(BaseModel):
    name: str


class PantryItemIn(BaseModel):
    name: str
    recipes: List
    user_id: str


class PantryItemOut(PantryItemIn):
    id: str
    name: str
    recipes: List
    user_id: str


class PantryItems(BaseModel):
    pantry_items: List[PantryItemOut]


class IngredientIn(BaseModel):
    name: str
    recipe: List


class IngredientOut(IngredientIn):
    name: str


class Ingredients(BaseModel):
    ingredients: List[IngredientOut]


class DeleteStatus(BaseModel):
    status: bool
