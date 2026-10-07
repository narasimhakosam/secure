# 🚀 Deployment Guide: Student ScamGuard AI

This guide explains how to run the project locally and how to deploy the **Backend (FastAPI)** to **Render** and the **Frontend (React + Vite)** to **Vercel**.

---

## 1. Local Development (Running Locally)

### A. Run the Backend
```bash
cd backend

# Create and activate virtual environment (if not already done)
python -m venv venv
.\venv\Scripts\activate      # Windows (PowerShell)
# source venv/bin/activate  # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Run the backend API server
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
- **Backend API**: [http://127.0.0.1:8000](http://127.0.0.1:8000)
- **Interactive Swagger Docs**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **Health Check**: [http://127.0.0.1:8000/api/v1/health](http://127.0.0.1:8000/api/v1/health)

### B. Run the Frontend
```bash
cd frontend

# Install npm dependencies
npm install

# Start Vite dev server
npm run dev
```
- **Frontend Web App**: [http://localhost:5173](http://localhost:5173)
*(The Vite dev server automatically proxies `/api` calls to `http://localhost:8000`)*

---

## 2. Deploying Backend to Render

### Method A: Connect via Git Repository (Recommended)
1. Push your repository to **GitHub** or **GitLab**.
2. Log in to [Render Dashboard](https://dashboard.render.com).
3. Click **"New +"** &rarr; **"Web Service"**.
4. Connect your GitHub repository.
5. Configure the following settings:
   - **Name**: `scamguard-ai-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Python`
   - **Region**: Choose closest to your users (e.g., `Oregon (US West)` or `Singapore`)
   - **Branch**: `main`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
6. Add **Environment Variables** in the Render settings:
   - `PYTHON_VERSION`: `3.11.9`
   - `CORS_ORIGINS`: `*` (or your Vercel domain e.g. `https://your-app.vercel.app`)
   - `DEBUG`: `false`
7. Click **"Create Web Service"**.
8. Once deployed, note down your Render service URL (e.g., `https://scamguard-ai-backend.onrender.com`).
   - Test it: `https://scamguard-ai-backend.onrender.com/api/v1/health`

### Method B: Render Blueprint (`render.yaml`)
If using Render Blueprints:
- Render will automatically detect the [`render.yaml`](file:///c:/Projects/secure/render.yaml) file in the root of the repository and configure all settings automatically.

---

## 3. Deploying Frontend to Vercel

### Steps to Deploy:
1. Log in to [Vercel Dashboard](https://vercel.com).
2. Click **"Add New..."** &rarr; **"Project"**.
3. Import your GitHub repository.
4. In the **Configure Project** screen:
   - **Project Name**: `student-scamguard-ai`
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click "Edit" and choose `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Expand **Environment Variables**:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://scamguard-ai-backend.onrender.com` *(paste your Render backend URL from Step 2, no trailing slash)*
6. Click **"Deploy"**.
7. In a few moments, your application will be live at `https://your-project.vercel.app`.

---

## 4. Verification Checklist After Deployment

| Check | URL / Action | Expected Result |
| :--- | :--- | :--- |
| **Backend Health** | `GET https://your-backend.onrender.com/api/v1/health` | `{"status":"ok", "version":"1.0.0", ...}` |
| **Backend Docs** | `GET https://your-backend.onrender.com/docs` | OpenAPI / Swagger UI interactive page |
| **Frontend Home** | `https://your-frontend.vercel.app` | ScamGuard AI interface loaded with custom design |
| **End-to-End Analysis** | Click any sample chip &rarr; "Analyze Now" | Risk score gauge (0-100), explainable red flag indicators, directives |
| **Modals** | Click "Learn About Scams", "Safety Checklist", "History" | Interactive drawers and modals opening properly |
