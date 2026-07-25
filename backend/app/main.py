from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.auth import router as auth_router
from app.database import Base, engine
from app.routes.leads import router as lead_router
import app.models

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="LeadDesk API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
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