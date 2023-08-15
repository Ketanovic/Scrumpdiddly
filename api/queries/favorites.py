# from models import FavoritesIn
# from bson.objectid import ObjectId
# from queries.client import MongoQueries

# class FavoriteQueries(MongoQueries):
#     collection_name = 'favorites'

#     def create(self,favorite_in: FavoriteIn, account_id:str):
#         favorite = favorite_in.dict()
#         favorite['account_id'] = account_id
#         self.collection.insert_one(favorite)
#         favorite['id'] = str(favorite['id'])
#         return favorite

#     def list_all_for_account(self, account_id: str):
#         results = []
#         for favorite in self.collection.find({'account_id': account_id}):
#             favorite['id'] = str(favorite['_id'])
#             results.append(favorite)
#         return results

#     def delete(self, favorite_id: str, account_id: str):
#         result = self.collection.delete_one({})
