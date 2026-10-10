from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
from datetime import datetime
import uuid
from app import models
from app.database import get_db
from app.routers.auth import get_current_user

router = APIRouter()

class ApplicationCreate(BaseModel):
    campaign_id: str
    proposal: str
    proposed_price: int
    portfolio_link: str
    availability: str

@router.post("/", response_model=dict)
def apply_to_campaign(application: ApplicationCreate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role != "creator":
        raise HTTPException(status_code=403, detail="Only creators can apply to campaigns")
    
    # Check if already applied
    existing = db.query(models.Application).filter(
        models.Application.campaign_id == application.campaign_id,
        models.Application.creator_id == current_user.id
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Already applied to this campaign")
        
    new_app = models.Application(
        id=str(uuid.uuid4()),
        campaign_id=application.campaign_id,
        creator_id=current_user.id,
        proposal=application.proposal,
        proposed_price=application.proposed_price,
        portfolio_link=application.portfolio_link,
        availability=application.availability,
        submitted_at=datetime.utcnow().isoformat()
    )
    db.add(new_app)
    db.commit()
    db.refresh(new_app)
    return {"id": new_app.id, "status": new_app.status}

@router.get("/", response_model=list)
def get_applications(db: Session = Depends(get_db)):
    # Very simplified
    return db.query(models.Application).all()
