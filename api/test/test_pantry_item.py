from models import PantryItemIn, PantryItemOut, PantryItems
from fastapi.testclient import TestClient
from main import app
from queries.pantry_item import PantryItemQueries

client = TestClient(app)


class FakePantryItemQueries:    

    def create(self, pantry_item_in: PantryItemIn) -> PantryItemOut:
        return {"name": "string", "recipes": ["string"], "id": "string"}

    def find_all(self):
        return [{"name": "string", "recipes": ["string"], "id": "string"}]


def test_list_pantry_items():
    app.dependency_overrides[PantryItemQueries] = FakePantryItemQueries
    res = client.get("/api/pantry_item")
    data = res.json()

    assert res.status_code == 200
    assert data == {"pantry_items": [{"name": "string", "recipes": ["string"], "id": "string"}]}


def test_create_pantry_item():
    app.dependency_overrides[PantryItemQueries] = FakePantryItemQueries
    pantry = {"name": "string", "recipes": ["string"]}
    res = client.post("/api/pantry_item", json=pantry)
    data = res.json()
    assert res.status_code == 200
    assert data == {"name": "string", "recipes": ["string"], "id": "string"}