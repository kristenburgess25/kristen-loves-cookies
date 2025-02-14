# Baking Blog Project - README

## Project Overview
This project is a **full-stack baking blog** showcasing both my **personal passion for baking** and my **full stack development skills**. It features a **FastAPI backend with PostgreSQL** and a **Next.js frontend** styled with **TailwindCSS**. The backend is deployed using **Google Cloud Run**, and the database is hosted on **Google Cloud SQL**.

## Project Structure
- **Backend:** FastAPI with PostgreSQL & SQLAlchemy ORM
- **Frontend:** Next.js (React) with TailwindCSS
- **Database:** PostgreSQL (locally & on Google Cloud SQL)
- **Deployment:**
  - API → Google Cloud Run
  - Database → Google Cloud SQL

---

## Development & Deployment Workflows

### Local Development
1. **Start Local PostgreSQL Database**
   ```sh
   brew services start postgresql@15  # If using Homebrew
   ```
   OR manually start it:
   ```sh
   pg_ctl -D /opt/homebrew/var/postgresql15 start
   ```
   
2. **Activate Virtual Environment**
   ```sh
   source .venv/bin/activate
   ```

3. **Set Environment to Development**
   ```sh
   export ENV=dev
   ```

4. **Run FastAPI Server Locally**
   ```sh
   uvicorn main:app --reload
   ```

5. **Access API Docs**
   Open: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

### Deploying API to Google Cloud Run
1. **Authenticate with Google Cloud**
   ```sh
   gcloud auth login
   gcloud config set project baking-blog-450404
   ```

2. **Build & Push Docker Image to GCR**
   ```sh
   docker buildx build --platform linux/amd64 -t gcr.io/baking-blog-450404/fastapi-baking-blog .
   docker push gcr.io/baking-blog-450404/fastapi-baking-blog
   ```

3. **Deploy to Cloud Run**
   ```sh
   gcloud run deploy baking-blog-api \
     --image gcr.io/baking-blog-450404/fastapi-baking-blog \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated
   ```

4. **Get Cloud Run URL**
   ```sh
   gcloud run services describe baking-blog-api --platform managed --region us-central1 --format 'value(status.url)'
   ```

---

### Connecting to Cloud SQL (Google Hosted DB)
1. **Start Cloud SQL Proxy**
   ```sh
   cloud-sql-proxy --port=5432 baking-blog-450404:us-central1:baking-blog-db
   ```

2. **Connect via psql**
   ```sh
   psql -U postgres -d baking_blog_db -h 127.0.0.1 -p 5432
   ```

---

## Database Management

### Creating the Database Locally
```sh
psql -U postgres -c "CREATE DATABASE baking_blog_db;"
```

### Running Migrations (Creating Tables)
The project uses **SQLAlchemy ORM** for database interactions.
```sh
python models.py
```

### Importing Recipe Data from JSON
```sh
python import_recipes.py
```

### Transferring Data to Google Cloud SQL
1. **Dump Local Database**
   ```sh
   pg_dump -U postgres -d baking_blog_db -F c -f backup.sql
   ```
2. **Restore to Cloud SQL**
   ```sh
   pg_restore -U postgres -h 127.0.0.1 -p 5432 -d baking_blog_db backup.sql
   ```

---

## Git & GitHub Workflow

### Initializing Git
```sh
git init
git add .
git commit -m "Initial commit"
```

### Connecting to Remote Repository
```sh
git remote add origin git@github.com:kristenburgess25/kristen-loves-cookies.git
git branch -M main
git push -u origin main
```

### Common Git Commands
- **Check Status:** `git status`
- **Add Changes:** `git add .`
- **Commit Changes:** `git commit -m "message"`
- **Push to GitHub:** `git push origin main`
- **Pull Latest Changes:** `git pull origin main`

---

## Future Enhancements
- **Frontend Development (Next.js) 📌**
- **API Authentication & User Roles**
- **Automated CI/CD Pipeline for Deployments**
- **Advanced Search & Filtering for Recipes**
- **Performance Optimizations (Indexing, Caching, etc.)**

---

### Notes
- **Always set the correct environment (`ENV=dev` or `ENV=prod`) before running commands.**
- **Use the Cloud SQL Proxy when working with Google Cloud SQL locally.**
- **Check API logs via `gcloud run services logs read baking-blog-api`.**

