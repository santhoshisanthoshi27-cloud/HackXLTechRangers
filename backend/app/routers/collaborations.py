from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import datetime
import uuid
from app import models
from app.database import get_db
from app.routers.auth import get_current_user

router = APIRouter()

@router.get("/", response_model=list)
def get_collaborations(db: Session = Depends(get_db)):
    return db.query(models.Collaboration).all()

@router.post("/{collab_id}/submit", response_model=dict)
def submit_deliverable(collab_id: str, url: str, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role != "creator":
        raise HTTPException(status_code=403, detail="Only creators can submit deliverables")
        
    collab = db.query(models.Collaboration).filter(models.Collaboration.id == collab_id).first()
    if not collab or collab.creator_id != current_user.id:
        raise HTTPException(status_code=404, detail="Collaboration not found")
        
    collab.submitted_url = url
    collab.progress_status = "Submitted"
    collab.progress_percentage = 90
    db.commit()
    return {"id": collab.id, "status": collab.progress_status}
