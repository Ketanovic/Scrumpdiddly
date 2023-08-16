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
