from pydantic import BaseModel
from typing import List
from jwtdown_fastapi.authentication import Token


class AccountIn(BaseModel):
    email: str
    password: str
    full_name: str


class AccountOut(BaseModel):
    id: str
    email: str
    full_name: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class RecipesID(BaseModel):
    name: str
    url: str


class AccountToken(Token):
    account: AccountOut