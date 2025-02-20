## Use official Python image
#FROM python:3.11
#
## Set working directory
#WORKDIR /app
#
## Copy requirements and install dependencies
#COPY requirements.txt .
#RUN pip install --no-cache-dir -r requirements.txt
#
## Copy app files
#COPY . .
#
## Expose port 8080 for Google Cloud Run
#ENV PORT=8080
#EXPOSE 8080
#
## Start FastAPI with Uvicorn on port 8080
#CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]

# Setup for Vercel
# Use official Python image
FROM python:3.11

# Set the working directory
WORKDIR /app

# Copy only the required files to avoid caching issues
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose port 8080 (Vercel requires this)
ENV PORT=8080
EXPOSE 8080

# Command to start FastAPI using Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080", "--workers", "1", "--timeout-keep-alive", "120"]


