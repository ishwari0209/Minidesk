from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.config.security import verify_token
from app.database import get_db
from app.models import Admin

security = HTTPBearer()


def get_current_admin(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    token = credentials.credentials

    payload = verify_token(token)

    if payload is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

    email = payload.get("sub")

    admin = db.query(Admin).filter(
        Admin.email == email
    ).first()

    if admin is None:
        raise HTTPException(
            status_code=401,
            detail="Admin not found"
        )

    return admin