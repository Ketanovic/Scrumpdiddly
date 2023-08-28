
from pymongo import MongoClient
import os
from models import AccountIn, AccountOutWithHashedPassword


DATABASE_URL = os.environ.get("DATABASE_URL")
client = MongoClient(DATABASE_URL)
db = client["account-db"]


class DuplicateAccountError(ValueError):
    pass


class AccountQueries:
    @property
    def collection(self):
        return db["accounts"]

    def get(self, username: str):
        account = self.collection.find_one({"username": username})
        if account is None:
            return None
        account["id"] = str(account["_id"])
        return AccountOutWithHashedPassword(**account)

    def create(self, info: AccountIn, hashed_password: str):
        account = info.dict()
        if self.get(account["username"]) is not None:
            raise DuplicateAccountError
        account["hashed_password"] = hashed_password
        del account["password"]
        self.collection.insert_one(account)
        account["id"] = str(account["_id"])
        return account
