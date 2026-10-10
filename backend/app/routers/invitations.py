from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import datetime
import uuid
from app import models
from app.database import get_db
from app.routers.auth import get_current_user

router = APIRouter()

class InvitationCreate(BaseModel):
    campaign_id: str
    creator_id: str
    notes: str

@router.post("/", response_model=dict)
def invite_creator(invitation: InvitationCreate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role != "business":
        raise HTTPException(status_code=403, detail="Only businesses can send invitations")
        
    existing = db.query(models.Invitation).filter(
        models.Invitation.campaign_id == invitation.campaign_id,
        models.Invitation.creator_id == invitation.creator_id
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Already invited this creator to this campaign")
        
    new_inv = models.Invitation(
        id=str(uuid.uuid4()),
        campaign_id=invitation.campaign_id,
        creator_id=invitation.creator_id,
        business_id=current_user.id,
        notes=invitation.notes,
        sent_at=datetime.utcnow().isoformat()
    )
    db.add(new_inv)
    db.commit()
    db.refresh(new_inv)
    return {"id": new_inv.id, "status": new_inv.status}

@router.get("/", response_model=list)
def get_invitations(db: Session = Depends(get_db)):
    return db.query(models.Invitation).all()
