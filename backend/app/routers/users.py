from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app import schemas, models
from app.database import get_db
from app.routers.auth import get_current_user
from pydantic import BaseModel

router = APIRouter()

class ProfileUpdate(BaseModel):
    phone_number: Optional[str] = None
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    location: Optional[str] = None
    
    # Business
    company_name: Optional[str] = None
    industry: Optional[str] = None
    website: Optional[str] = None
    
    # Creator
    handle: Optional[str] = None
    primary_niche: Optional[str] = None
    niches: Optional[List[str]] = None
    platforms: Optional[List[str]] = None
    audience_size: Optional[str] = None
    total_followers: Optional[int] = None
    engagement_rate: Optional[float] = None
    pricing_range: Optional[str] = None
    min_budget: Optional[int] = None
    max_budget: Optional[int] = None
    available: Optional[bool] = None

@router.put("/me", response_model=schemas.UserResponse)
def update_profile(profile_data: ProfileUpdate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    for key, value in profile_data.dict(exclude_unset=True).items():
        setattr(current_user, key, value)
    
    db.commit()
    db.refresh(current_user)
    return current_user

@router.get("/creators", response_model=List[schemas.UserResponse])
def get_creators(niche: Optional[str] = None, platform: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(models.User).filter(models.User.role == "creator")
    
    # Basic filtering, we can expand on this for JSON columns
    if niche:
        # Simplistic filtering for demonstration (Postgres/SQLite JSON filtering differs)
        # We will filter primary_niche here for simplicity
        query = query.filter(models.User.primary_niche == niche)
    
    creators = query.all()
    return creators

@router.get("/{user_id}", response_model=schemas.UserResponse)
def get_user(user_id: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
