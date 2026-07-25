from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.auth import router as auth_router
from app.routes.leads import router as lead_router
from app.database import Base, engine
import app.models

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="LeadDesk API",
    version="1.0.0"
)

# Explicit origins + Vercel regex preview support
origins = [
    "https://minidesk.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(lead_router)
app.include_router(auth_router)

@app.get("/")
def home():
    return {
        "message": "LeadDesk Backend Running 🚀"
    }