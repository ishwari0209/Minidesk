from fastapi import APIRouter, Depends
from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_admin
from app.models import Admin, Lead
from app.schemas import LeadCreate, LeadStatusUpdate

# Add prefix and tags here:
router = APIRouter(prefix="/admin/leads", tags=["Leads"])


# Hits POST /admin/leads
@router.post("")
def create_lead(
    lead: LeadCreate,
    db: Session = Depends(get_db)
):
    new_lead = Lead(
        name=lead.name,
        email=lead.email,
        budget=lead.budget,
        message=lead.message
    )

    db.add(new_lead)
    db.commit()
    db.refresh(new_lead)

    return {
        "message": "Lead submitted successfully",
        "id": new_lead.id
    }


# Hits GET /admin/leads
@router.get("")
def get_all_leads(
    search: str = "",
    current_admin: Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    query = db.query(Lead)

    if search:
        query = query.filter(
            or_(
                Lead.name.ilike(f"%{search}%"),
                Lead.email.ilike(f"%{search}%")
            )
        )

    return query.order_by(Lead.created_at.desc()).all()


# Hits PUT /admin/leads/{lead_id}
@router.put("/{lead_id}")
def update_status(
    lead_id: int,
    data: LeadStatusUpdate,
    current_admin: Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    lead = db.query(Lead).filter(
        Lead.id == lead_id
    ).first()

    if not lead:
        return {
            "message": "Lead not found"
        }

    lead.status = data.status

    db.commit()
    db.refresh(lead)

    return {
        "message": "Status updated successfully"
    }