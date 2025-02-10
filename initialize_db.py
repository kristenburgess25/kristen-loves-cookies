import models  # 👈 Ensure models are imported before `Base.metadata.create_all()`
from database import engine, Base

# Explicitly print registered tables
print("Tables registered before creation:", Base.metadata.tables.keys())

# Apply the schema
with engine.begin() as connection:
    Base.metadata.drop_all(connection)  # Drop existing tables
    Base.metadata.create_all(connection)  # Recreate tables

print("Schema successfully created!")
print("Tables registered after creation:", Base.metadata.tables.keys())
