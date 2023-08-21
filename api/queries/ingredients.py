from pydantic import BaseModel
from pymongo import MongoClient
import os
import pymongo
from models import IngredientIn, IngredientOut, Ingredients

DATABASE_URL = os.environ.get("DATABASE_URL")
client = MongoClient(DATABASE_URL)
db = client["ingredient-db"]


class DuplicateIngredientError(ValueError):
    pass


class IngredientQueries:

    @property
    def collection(self):
        return db["ingredients"]

    def create(self, ingredient_in: IngredientIn):
        ingredients = ingredient_in
        for ingredient in ingredients:
            print(ingredient)
            dup = self.collection.find_one({"name": ingredient["name"]})
            print(dup)
            if dup is None:
                self.collection.insert_one(ingredient)
            else:
                continue
        return ingredient            

    def find_all(self):
        results = []
        for ingredient in self.collection.find():
            results.append(ingredient)
        return results
