from pydantic import BaseModel
from pymongo import MongoClient
import os
from models import IngredientIn, IngredientOut, Ingredients

DATABASE_URL = os.environ.get("DATABASE_URL")
client = MongoClient(DATABASE_URL)
db = client["ingredient-db"]


class IngredientQueries:

    @property
    def collection(self):
        return db["ingredients"]
    
    def create(self, ingredient_in: IngredientIn):
        ingredient = ingredient_in.dict()
        self.collection.insertMany(ingredient)
        ingredient["id"] = str(ingredient["_id"])
        return ingredient