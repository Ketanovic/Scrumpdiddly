from models import RecipeOut
from fastapi.testclient import TestClient
from main import app
from queries.recipes import RecipeQueries

client = TestClient(app)


class FakeRecipeQueries:
    def find_all(self):
        return {
            "recipes": [
                {
                    "id": "string",
                    "name": "string",
                    "category": "string",
                    "area": "string",
                    "instructions": "string",
                    "ingredients": {},
                    "thumbnail": "string",
                }
            ]
        }

    def get_recipe(self, id: RecipeOut):
        return {
            "name": "string",
            "category": "string",
            "area": "string",
            "instructions": "string",
            "ingredients": {},
            "thumbnail": "string",
        }

    def get_one(self, id):
        if id == "64f9e07ba76d802cbc3e8487":
            return {
                "id": "string",
                "name": "string",
                "category": "string",
                "area": "string",
                "instructions": "string",
                "ingredients": {},
                "thumbnail": "string",
            }
        else:
            return None


def test_recipes_list():
    res = client.get("/api/recipes")
    data = res.json()

    assert res.status_code == 200
    assert "recipes" in data
    assert isinstance(data["recipes"], list)

    if data["recipes"]:
        first_recipe = data["recipes"][0]
        assert "name" in first_recipe
        assert "category" in first_recipe
        assert "area" in first_recipe
        assert "instructions" in first_recipe
        assert "ingredients" in first_recipe
        assert "thumbnail" in first_recipe


def test_get_recipe():
    app.dependency_overrides[RecipeQueries] = FakeRecipeQueries
    recipe_id = "64f9e07ba76d802cbc3e8487"
    res = client.get(f"/api/recipes/{recipe_id}")
    data = res.json()
    assert res.status_code == 200
    assert "name" in data
    assert "category" in data
    assert "area" in data
    assert "instructions" in data
    assert "ingredients" in data
    assert "thumbnail" in data
