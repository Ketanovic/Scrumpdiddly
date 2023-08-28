from pymongo import MongoClient
import os
from models import IngredientIn
from pymongo.errors import DuplicateKeyError


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
        dup = self.collection.find_one({"name": ingredients["name"]})
        if dup is None:
            try:
                self.collection.insert_one(ingredients)
            except DuplicateKeyError:
                print("duplicate key error caught")
                pass

        else:
            if ingredients["recipe"][0] not in dup["recipe"]:
                self.collection.update_one(
                    {"name": ingredients["name"]},
                    {'$push': {"recipe": ingredients["recipe"][0]}},
                    )

    def find_all(self):
        results = []
        for ingredient in self.collection.find():
            results.append(ingredient)
        return results
