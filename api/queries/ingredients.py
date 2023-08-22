from pymongo import MongoClient
import os
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
        print("*********", ingredients)
        dup = self.collection.find_one({"name": {ingredients["name"]}})
        if dup is None:
            self.collection.insert_one(dict(ingredients))
        return ingredients

    def find_all(self):
        results = []
        for ingredient in self.collection.find():
            results.append(ingredient)
        return results
