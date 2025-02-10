import json
from sqlalchemy.orm import Session
from sqlalchemy import select
from database import engine
from models import Recipe, Category, Tag, recipe_tags

# 📌 Load JSON data from file
with open("recipes.json", "r") as file:
    recipes_data = json.load(file)

# 📌 Function to get or create a category
def get_or_create_category(session, category_name):
    category = session.execute(select(Category).where(Category.name == category_name)).scalar()
    if not category:
        category = Category(name=category_name)
        session.add(category)
        session.flush()  # Assigns ID before commit
    return category

# 📌 Function to get or create tags
def get_or_create_tags(session, tag_names):
    tags = []
    for tag_name in tag_names:
        tag = session.execute(select(Tag).where(Tag.name == tag_name)).scalar()
        if not tag:
            tag = Tag(name=tag_name)
            session.add(tag)
            session.flush()
        tags.append(tag)
    return tags

# 📌 Insert Recipes & Link Categories/Tags
def import_recipes():
    with Session(engine) as session:
        for recipe_data in recipes_data:
            # Get/Create Category
            category = get_or_create_category(session, recipe_data["category"])

            # Get/Create Tags
            tags = get_or_create_tags(session, recipe_data.get("tags", []))

            # Create Recipe Entry
            recipe = Recipe(
                id=recipe_data["id"],
                title=recipe_data["title"],
                subtitle=recipe_data["subtitle"],
                category_id=category.id,
                hero_image=recipe_data["hero"],
                images=recipe_data["images"],
                introduction=recipe_data["introduction"],
                yield_amount=recipe_data["recipe"]["yield"],
                prep_time=recipe_data["recipe"].get("prep-time", ""),
                ingredients=recipe_data["recipe"]["ingredients"],
                instructions=recipe_data["recipe"]["instructions"],
                notes=recipe_data["recipe"].get("notes", [])
            )

            session.add(recipe)
            session.flush()  # Ensures recipe.id is assigned

            # Link Recipe to Tags
            for tag in tags:
                session.execute(recipe_tags.insert().values(recipe_id=recipe.id, tag_id=tag.id))

        session.commit()
        print("✅ Recipes imported successfully!")

# 📌 Run the import function
if __name__ == "__main__":
    import_recipes()
