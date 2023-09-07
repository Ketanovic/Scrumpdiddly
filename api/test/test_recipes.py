from fastapi.testclient import TestClient
from main import app
from queries.recipes import RecipeQueries
from models import RecipeIn


client = TestClient(app)


class FakeRecipeQueries:
    def create(self, info: RecipeIn) -> dict:
        return {
            "name": "Tuna Sandwhich",
            "category": "Sandwich",
            "area": "American",
            "instructions": "Squish tuna between bread",
            "ingredients": {},
            "thumbnail": "string",
        }


def test_create_recipe():
    app.dependency_overrides[RecipeQueries] = FakeRecipeQueries
    recipe = {
        "name": "Tuna Sandwhich",
        "category": "Sandwich",
        "area": "American",
        "instructions": "Squish tuna between bread",
        "ingredients": {},
        "thumbnail": "string",
    }
    res = client.post("/api/recipes", json=recipe)
    data = res.json()
    assert res.status_code == 200
    assert data == {
        "name": "Tuna Sandwhich",
        "category": "Sandwich",
        "area": "American",
        "instructions": "Squish tuna between bread",
        "ingredients": {},
        "thumbnail": "string",
    }
