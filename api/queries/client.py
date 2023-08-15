from pymongo import MongoClient
from pymongo.collection import Collection
import os

DATABASE_URL = os.enviorn.get("DATABASE_URL")
client = MongoClient(DATABASE_URL)
db = client["mongo-express"]

class MongoQueries:
    @property
    def collection(self) -> Collection:
        return db[self.collection_name]
