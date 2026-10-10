from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
import uuid
from app import schemas, models
from app.database import get_db
from app.routers.auth import get_current_user

router = APIRouter()

@router.post("/", response_model=schemas.CampaignResponse)
def create_campaign(campaign: schemas.CampaignCreate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role != "business":
        raise HTTPException(status_code=403, detail="Only businesses can create campaigns")
    
    new_campaign = models.Campaign(
        id=str(uuid.uuid4()),
        business_profile_id=current_user.id,
        title=campaign.title,
        brand_name=campaign.brand_name,
        description=campaign.description,
        budget=campaign.budget,
        platforms=campaign.platforms,
        deliverables=campaign.deliverables,
        created_at=datetime.utcnow().isoformat()
    )
    db.add(new_campaign)
    db.commit()
    db.refresh(new_campaign)
    return new_campaign

@router.get("/", response_model=List[schemas.CampaignResponse])
def get_campaigns(db: Session = Depends(get_db)):
    return db.query(models.Campaign).all()

@router.put("/{campaign_id}", response_model=schemas.CampaignResponse)
def update_campaign(campaign_id: str, updates: schemas.CampaignUpdate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    campaign = db.query(models.Campaign).filter(models.Campaign.id == campaign_id).first()
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    if campaign.business_profile_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to edit this campaign")
    
    update_data = updates.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(campaign, key, value)
    
    db.commit()
    db.refresh(campaign)
    return campaign

@router.delete("/{campaign_id}")
def delete_campaign(campaign_id: str, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    campaign = db.query(models.Campaign).filter(models.Campaign.id == campaign_id).first()
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    if campaign.business_profile_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this campaign")
    
    db.delete(campaign)
    db.commit()
    return {"status": "deleted"}
