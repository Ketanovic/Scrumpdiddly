from models import PantryItemIn, PantryItemOut
from fastapi.testclient import TestClient
from main import app
from queries.pantry_item import PantryItemQueries
from pydantic import BaseModel
from authenticator import authenticator

client = TestClient(app)


class UserOut(BaseModel):
    username: str
    email: str


def fake_get_current_account_data():
    return UserOut(username="user", email="user@geats.com")


class FakePantryItemQueries:
    def create(self, pantry_item_in: PantryItemIn) -> PantryItemOut:
        return {
            "name": "string",
            "recipes": ["string"],
            "id": "string",
            "user_id": "string",
        }

    def find_all(self):
        return [
            {
                "name": "string",
                "recipes": ["string"],
                "id": "string",
                "user_id": "string",
            }
        ]

    def delete(self, pantry_item_id: str):
        return True


def test_list_pantry_items():
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    headers = {"Authorization": "Bearer your_access_token_here"}
    app.dependency_overrides[PantryItemQueries] = FakePantryItemQueries
    res = client.get("/api/pantry_item", headers=headers)
    data = res.json()

    assert res.status_code == 200
    assert data == {
        "pantry_items": [
            {
                "name": "string",
                "recipes": ["string"],
                "id": "string",
                "user_id": "string",
            }
        ]
    }


def test_create_pantry_item():
    app.dependency_overrides[PantryItemQueries] = FakePantryItemQueries
    pantry = {"name": "string", "recipes": ["string"], "user_id": "string"}
    res = client.post("/api/pantry_item", json=pantry)
    data = res.json()
    assert res.status_code == 200
    assert data == {
        "name": "string",
        "recipes": ["string"],
        "id": "string",
        "user_id": "string",
    }


def test_delete_pantry_item():
    app.dependency_overrides[PantryItemQueries] = FakePantryItemQueries
    response = client.delete("/api/pantry_item/{pantry_item_id}")
    data = response.json()
    assert response.status_code == 200
    assert data == {"status": True}
