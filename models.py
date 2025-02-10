from sqlalchemy import Column, String, Text, ForeignKey, Integer
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import relationship
from database import Base, engine

class Recipe(Base):
    __tablename__ = "recipes"

    id = Column(String, primary_key=True, index=True)  # Unique identifier
    title = Column(String, nullable=False, index=True)  # Searchable
    subtitle = Column(String, index=True)  # Searchable
    category_id = Column(Integer, ForeignKey("categories.id"), index=True)  # Filterable
    hero_image = Column(String)  # Main image filename
    images = Column(JSONB, nullable=True)  # List of additional image filenames
    introduction = Column(Text, index=True)  # Searchable
    yield_amount = Column(String, nullable=True)  # "50 medium or 30 large cookies"
    prep_time = Column(String, nullable=True)  # Store prep time if available

    # Store structured fields as JSON
    ingredients = Column(JSONB, nullable=False)  # List of ingredient strings
    instructions = Column(JSONB, nullable=False)  # Ordered list of steps
    notes = Column(JSONB, nullable=True)  # Additional recipe tips

    category = relationship("Category", back_populates="recipes")
    tags = relationship("Tag", secondary="recipe_tags", back_populates="recipes")

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False, index=True)  # Searchable

    recipes = relationship("Recipe", back_populates="category")

class Tag(Base):
    __tablename__ = "tags"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False, index=True)  # Filterable

    recipes = relationship("Recipe", secondary="recipe_tags", back_populates="tags")

# Many-to-Many Relationship for Tags
from sqlalchemy import Table
recipe_tags = Table(
    "recipe_tags",
    Base.metadata,
    Column("recipe_id", String, ForeignKey("recipes.id"), primary_key=True),
    Column("tag_id", Integer, ForeignKey("tags.id"), primary_key=True),
)

Base.metadata.create_all(bind=engine)