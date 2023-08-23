# from fastapi import (
#     APIRouter,
#     Depends,
#     Request,
#     Response,
#     HTTPException,
#     status,
# )
# from models import (
#     Recipes,
#     RecipeForm,
#     RecipeIn,
#     RecipeOut,
#     RecipeNameForm,
#     RecipeName,
#     IngredientIn,
#     IngredientOut,
#     Ingredients,
# )
# from queries.recipes import RecipeQueries
# from queries.ingredients import IngredientQueries, DuplicateIngredientError
# import requests

# router = APIRouter()


# def create_ingredients():
#     queries = IngredientQueries()
#     letters = [
#         "a",
#         "b",
#         "c",
#         "d",
#         "e",
#         "f",
#         "g",
#         "h",
#         "i",
#         "j",
#         "k",
#         "l",
#         "m",
#         "n",
#         "o",
#         "p",
#         "r",
#         "s",
#         "t",
#         "v",
#         "w",
#         "y",
#     ]

#     for letter in letters:
#         api_url = (
#             "https://www.themealdb.com/api/json/v1/1/search.php?f=" + letter
#         )
#         response = requests.get(api_url)
#         data = response.json()
#         ing_dict = {}
#         for j in range(len(data["meals"])):
#             for i in range(1, 21):
#                 if (
#                     data["meals"][j]["strIngredient" + str(i)] != ""
#                     and data["meals"][j]["strIngredient" + str(i)] != None
#                 ):
#                     checker = data["meals"][j][
#                         "strIngredient" + str(i)
#                     ].upper()
#                     if "EGG" in checker and checker != "EGG PLANTS":
#                         ing_dict["name"] = "EGG"
#                         ing_dict["recipe"] = []
#                         if data["meals"][j]["strMeal"] != None:
#                             ing_dict["recipe"].append(
#                                 data["meals"][j]["strMeal"].upper()
#                             )
#                             # call queries.create on single ingredient

#                     elif "FLOUR" in checker:
#                         ing_dict["name"] = "FLOUR"
#                         ing_dict["recipe"] = []
#                         if data["meals"][j]["strMeal"] != None:
#                             ing_dict["recipe"].append(
#                                 data["meals"][j]["strMeal"].upper()
#                             )
#                             # call queries.create on single ingredient

#                     elif "CHICKEN" in checker:
#                         ing_dict["name"] = "CHICKEN"
#                         ing_dict["recipe"] = []
#                         if data["meals"][j]["strMeal"] != None:
#                             ing_dict["recipe"].append(
#                                 data["meals"][j]["strMeal"].upper()
#                             )
#                             # call queries.create on single ingredient

#                     elif "ONION" in checker:
#                         ing_dict["name"] = "ONION"
#                         ing_dict["recipe"] = []
#                         if data["meals"][j]["strMeal"] != None:
#                             ing_dict["recipe"].append(
#                                 data["meals"][j]["strMeal"].upper()
#                             )
#                             # call queries.create on single ingredient

#                     else:
#                         ing_dict["name"] = data["meals"][j][
#                             "strIngredient" + str(i)
#                         ].upper()
#                         ing_dict["recipe"] = []
#                         if data["meals"][j]["strMeal"] != None:
#                             ing_dict["recipe"].append(
#                                 data["meals"][j]["strMeal"].upper()
#                             )
#                             # call queries.create on single ingredient

#                             # ing_list.append(ing_dict)
#                             ing_dict = {}
#                         else:
#                             continue

#     print(ing_dict)
#     # try:
#     #     print(ing_list)
#     #     return queries.create(ing_list)
#     # except DuplicateIngredientError:
#     #     pass


# create_ingredients()


# def list_all_recipes():
#     queries = RecipeQueries()
#     letters = [
#         "a",
#         "b",
#         "c",
#         "d",
#         "e",
#         "f",
#         "g",
#         "h",
#         "i",
#         "j",
#         "k",
#         "l",
#         "m",
#         "n",
#         "o",
#         "p",
#         "r",
#         "s",
#         "t",
#         "v",
#         "w",
#         "y",
#     ]
#     recipe_list = []
#     for letter in letters:
#         api_url = (
#             "http://www.themealdb.com/api/json/v1/1/search.php?f=" + letter
#         )
#         response = requests.get(api_url)
#         data = response.json()
#         for j in data["meals"]:
#             recipe_list.append(j)
#         for recipe in recipe_list:
#             encoder = {
#                 "name": recipe["strMeal"],
#                 "category": recipe["strCategory"],
#                 "area": recipe["strArea"],
#                 "instructions": recipe["strInstructions"],
#                 # "ingredients": recipe["strIngredient1"],
#                 # "thumbnail": recipe["strImageSource"],
#             }
#             queries.create(encoder)


# list_all_recipes()
