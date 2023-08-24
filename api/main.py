from authenticator import authenticator
from routers import pantry_item, ingredients
from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import accounts, recipes

app = FastAPI()
app.include_router(authenticator.router)
app.include_router(accounts.router)
app.include_router(recipes.router)

app.include_router(pantry_item.router, tags=["pantry_items"])
app.include_router(ingredients.router, tags=["ingredients"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00",
        }
    }


app.include_router(accounts.router, tags=["Accounts"])
app.include_router(recipes.router, tags=["Recipes"])
