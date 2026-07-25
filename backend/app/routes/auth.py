from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Admin
from app.schemas import AdminSignup
from app.config.security import hash_password
from app.schemas import AdminSignup, AdminLogin, Token

from app.config.security import (
    hash_password,
    verify_password,
    create_access_token,
)
router = APIRouter(prefix="/admin", tags=["Admin Authentication"])


@router.post("/signup")
def signup(admin: AdminSignup, db: Session = Depends(get_db)):

    existing_admin = db.query(Admin).filter(
        Admin.email == admin.email
    ).first()

    if existing_admin:
        raise HTTPException(
            status_code=400,
            detail="Admin already exists"
        )

    new_admin = Admin(
        email=admin.email,
        password=hash_password(admin.password)
    )

    db.add(new_admin)
    db.commit()
    db.refresh(new_admin)

    return {
        "message": "Admin registered successfully"
    }
@router.post("/login", response_model=Token)
def login(admin: AdminLogin, db: Session = Depends(get_db)):

    existing_admin = (
        db.query(Admin)
        .filter(Admin.email == admin.email)
        .first()
    )

    if not existing_admin:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not verify_password(
        admin.password,
        existing_admin.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    token = create_access_token(
        data={
            "sub": existing_admin.email
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }