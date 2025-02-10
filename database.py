import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Use different DATABASE_URLs for dev and prod
ENV = os.getenv("ENV", "dev")  # Default to development
if ENV == "prod":
    SQLALCHEMY_DATABASE_URL = os.getenv("PROD_DATABASE_URL")
else:
    SQLALCHEMY_DATABASE_URL = os.getenv("DEV_DATABASE_URL")

# Ensure the database URL is not None
if not SQLALCHEMY_DATABASE_URL:
    raise ValueError("DATABASE_URL is not set. Check your .env file.")

# Create database engine
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Define base model class
Base = declarative_base()
