import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Use different DATABASE_URLs for dev and prod
ENV = os.getenv("ENVIRONMENT", "dev")  # Default to development
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

# import os
# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker, declarative_base
#
# # Load environment variable
# DATABASE_URL = os.getenv("PROD_DATABASE_URL")
#
# if not DATABASE_URL:
#     raise ValueError("DATABASE_URL is not set. Check your .env file.")
#
# # Cloud SQL requires this format for Unix socket connection
# if "/cloudsql/" in DATABASE_URL:
#     DATABASE_URL = f"{DATABASE_URL}?host=/cloudsql/baking-blog-450404:us-central1:baking-blog-db"
#
# engine = create_engine(DATABASE_URL, pool_pre_ping=True)
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
#
# Base = declarative_base()
#
