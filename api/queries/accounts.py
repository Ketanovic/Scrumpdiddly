from pydantic import BaseModel
from pymongo import MongoClient
import os
from models import AccountIn


class DuplicateAccountError(ValueError):
    pass

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


class AccountOutWithHashedPassword(AccountOut):
    pass


DATABASE_URL = os.environ.get("DATABASE_URL")
client = MongoClient(DATABASE_URL)
db = client["mongo-express"]


class AccountQueries():
    @property
    def collection(self):
        return db["accounts"]

    def get(self, username: str):
        account = self.collection.find_one({"username": username})
        if account is None:
            return None
        account['id'] = str(account['_id'])
        return account

    def create(self, info: AccountIn, hashed_password: str):
        account = info.dict()
        account['hashed_password'] = hashed_password
        del account['password']
        self.collection.insert_one(account)
        account['id'] = str(account['_id'])
        return account



    # def get(self, email: str) -> AccountOut:
    #     account = self.collection.find_one({'username': email})
    #     if account is None:
    #         return None
    #     account['id'] = str(account['_id'])
    #     return AccountOutWithHashedPassword(**account)

    # def create(self, info: AccountIn, hashed_password: str) -> AccountOut:
    #     account_in = info.dict()
    #     if self.get(account_in['username']) is not None:
    #         raise DuplicateAccountError
    #     account_in['hashed_password'] = hashed_password
    #     del account_in['password']
    #     self.collection.insert_one(account_in)
    #     account_in['id'] = str(account_in['id'])
    #     print(AccountIn)
    #     return AccountOutWithHashedPassword(**account_in)
