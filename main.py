import os
import uvicorn
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import engine, SessionLocal
from models import Recipe, Category, Tag
from sqlalchemy import select
from sqlalchemy.orm import joinedload

from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

# Add CORS Middleware
# Get environment variable for frontend URL
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")  # Default for local dev

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],  # Restrict to frontend domain
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],  # Only allow necessary headers
)

# Dependency to get a DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI on Cloud Run!"}

# API: Get All Recipes
@app.get("/recipes")
# API: Get All Recipes (Now Includes Category Name)
def get_recipes(db: Session = Depends(get_db)):
    recipes = db.execute(select(Recipe).options(joinedload(Recipe.category))).scalars().all()

    # Convert SQLAlchemy objects to dictionaries
    return [
        {
            **recipe.__dict__,
            "category": recipe.category.name if recipe.category else None,  # Resolves category name
        }
        for recipe in recipes
    ]

# API: Get Recipe by ID
@app.get("/recipes/{recipe_id}")
def get_recipe_by_id(recipe_id: str, db: Session = Depends(get_db)):
    recipe = db.execute(select(Recipe).where(Recipe.id == recipe_id)).scalar_one_or_none()
    if not recipe:
        return {"error": "Recipe not found"}
    return recipe


# API: Get Recipes by Category
@app.get("/recipes/category/{category_name}")
def get_recipes_by_category(category_name: str, db: Session = Depends(get_db)):
    result = (
        db.execute(select(Recipe).join(Category).where(Category.name == category_name))
        .scalars()
        .all()
    )
    return result

# API: Get Recipes by Tag
@app.get("/recipes/tag/{tag_name}")
def get_recipes_by_tag(tag_name: str, db: Session = Depends(get_db)):
    result = (
        db.execute(select(Recipe).join(Tag, Recipe.tags).where(Tag.name == tag_name))
        .scalars()
        .all()
    )
    return result

# API: Search Recipes by Title/Subtitle/Introduction
@app.get("/recipes/search/{query}")
def search_recipes(query: str, db: Session = Depends(get_db)):
    result = (
        db.execute(
            select(Recipe)
            .where(
                Recipe.title.ilike(f"%{query}%")
                | Recipe.subtitle.ilike(f"%{query}%")
                | Recipe.introduction.ilike(f"%{query}%")
            )
        )
        .scalars()
        .all()
    )
    return result


# Ensure the app binds to the correct port
if __name__ == "__main__":
    port = int(os.getenv("PORT", 8080))  # Cloud Run requires PORT=8080
    host = "0.0.0.0"  # Ensure it listens on all interfaces

    print(f"🚀 Starting FastAPI on {host}:{port}...")
    import sys
    print(f"🔍 Python version: {sys.version}")
    print(f"🛠️ Environment Variables: {os.environ}")

    uvicorn.run("main:app", host=host, port=port, reload=False)

    # if __name__ == "__main__":
    #     port = int(os.getenv("PORT", 8080))  # Cloud Run requires PORT=8080
    #     print(f"🚀 Starting FastAPI on host 0.0.0.0 and port {port}...")
    #     uvicorn.run(app, host="0.0.0.0", port=port, log_level="debug")

