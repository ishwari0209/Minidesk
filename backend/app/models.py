from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from app.database import Base


class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100), nullable=False)

    email = Column(String(100), nullable=False)

    budget = Column(String(100), nullable=False)

    message = Column(String(500), nullable=False)

    status = Column(String(20), default="Pending")

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )
class Admin(Base):
    __tablename__ = "admins"

    id = Column(Integer, primary_key=True, index=True)

    email = Column(String(100), unique=True, nullable=False)

    password = Column(String(255), nullable=False)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )