from pydantic import BaseModel
from pymongo import MongoClient
import os
from models import RecipeIn
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

    def get(self, name: str):
        recipe = self.collection.find_one({"name": name})
        if recipe is None:
            return None
        recipe["id"] = str(recipe["_id"])
        return recipe

    def create(self, info: RecipeIn) -> dict:
        print(db["recipes"])
        recipe = info.dict()
        if self.get(recipe["name"]) is not None:
            raise DuplicateAccountError
        self.collection.insert_one(recipe)
        recipe["id"] = str(recipe["_id"])
        return recipe


    # async def get_api_recipe(self, info: RecipeOut):
    #     api_url = "http://www.themealdb.com/api/json/v1/1/search.php?f=a"
    #     response = requests.get(api_url)
    #     data = response.json()
    #     print(data)
    #     self.collection.insert_one(data)
    #     pass

    # @app.get("/fetch-data/")
    # async def fetch_data(self):
    #     api_url = "www.themealdb.com/api/json/v1/1/search.php?f=a"
    #     response = requests.get(api_url)
    #     data = response.json()
    #     print("thats sum data", data, type(data))
    #     self.collection.insert_all(data)
    #     print("OMG OMOGM OGM OMG", data)
    #     return {"message": f"{len(data.id)} recipes inserted"}
