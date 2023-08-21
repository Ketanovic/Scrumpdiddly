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
        ingredient = ingredient_in
        # if ingredient["name"] in ingredient:
        #     raise DuplicateIngredientError
        try:
            for ing in ingredient:
                print(ing)
                dup = self.collection.find()
                print("dup", dup)
                #if dup:
                self.collection.insert_many
            return ing
            #self.collection.insert_many(ingredient, ordered=False)

        except pymongo.errors.BulkWriteError as e:
            print(e.details['writeErrors'])
        #self.collection.insert_many(ingredient)
        # ingredient["id"] = str(ingredient["_id"])
        return ingredient

    def find_all(self):
        results = []
        for ingredient in self.collection.find():
            #ingredient['id'] = str(ingredient['id'])
            results.append(ingredient)
        return results
