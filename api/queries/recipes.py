from pydantic import BaseModel
from pymongo import MongoClient
import os
from models import RecipeIn, RecipeName
import requests

DATABASE_URL = os.environ.get("DATABASE_URL")
client = MongoClient(DATABASE_URL)
db = client["recipe-db"]


class DuplicateAccountError(ValueError):
    pass


class RecipeQueries:
    @property
    def collection(self):
        return db["recipes"]

    def get(self, info: RecipeName) -> str:
        recipe = self.collection.find_one({"name": info})
        if recipe is None:
            return None
        recipe["id"] = str(recipe["_id"])
        print("**************************************************")
        print(type(recipe))
        return recipe

    def create(self, info: RecipeIn) -> dict:
        print(db["recipes"])
        recipe = info.dict()
        if self.get(recipe["name"]) is not None:
            raise DuplicateAccountError
        self.collection.insert_one(recipe)
        recipe["id"] = str(recipe["_id"])
        return recipe

    def find_all(self):
        results = []
        for recipe in self.collection.find():
            results.append(recipe)
        return results



