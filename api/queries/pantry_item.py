
from pymongo import MongoClient
import os
from models import PantryItemIn

DATABASE_URL = os.environ.get("DATABASE_URL")
client = MongoClient(DATABASE_URL)
db = client["pantry-item-db"]


class DuplicatePantryItem(ValueError):
    pass


class PantryItemQueries:

    @property
    def collection(self):
        return db["pantry items"]

    def create(self, pantry_item_in: PantryItemIn):
        pantry = pantry_item_in.dict()
        self.collection.insert_one(pantry)
        pantry["id"] = str(pantry["_id"])
        return pantry

    def find_all(self):
        results = []
        for pantry in self.collection.find():
            pantry['id'] = str(pantry['_id'])
            results.append(pantry)
        return results
