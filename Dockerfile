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
# Use Python base image
FROM python:3.11

# Set environment variables
ENV PORT=8080
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app

# Copy application files
COPY . .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the correct port
EXPOSE 8080

# Start FastAPI with Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]

