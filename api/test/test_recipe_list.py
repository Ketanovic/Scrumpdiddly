from models import RecipeOut
from fastapi.testclient import TestClient
from main import app
from queries.recipes import RecipeQueries

client = TestClient(app)
