from pydantic import BaseModel
from pymongo import MongoClient
import os
from models import PantryItemIn, PantryItemOut

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

    # def get(self, name: str):
    #     pantry = self.collection.find_one({"name": name})
    #     if pantry is None:
    #         return None
    #     pantry["id"] = str(pantry("_id"))
    #     return PantryItemOut(**pantry)
    def find_all(self):
        result = []
        for pantry in self.collection.find():
            print("the pantry items", pantry)
        return result


