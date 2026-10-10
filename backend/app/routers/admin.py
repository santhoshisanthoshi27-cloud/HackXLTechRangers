from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app import schemas, models
from app.database import get_db
from app.routers.auth import get_current_admin_user

router = APIRouter()

@router.get("/overview")
def get_overview(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_admin_user)):
    total_users = db.query(models.User).count()
    total_business = db.query(models.User).filter(models.User.role == "business").count()
    total_creators = db.query(models.User).filter(models.User.role == "creator").count()
    total_campaigns = db.query(models.Campaign).count()
    pending_applications = db.query(models.Application).filter(models.Application.status == "Applied").count()
    active_collaborations = db.query(models.Collaboration).filter(models.Collaboration.progress_status != "Completed").count()
    
    return {
        "total_users": total_users,
        "total_business": total_business,
        "total_creators": total_creators,
        "total_campaigns": total_campaigns,
        "pending_applications": pending_applications,
        "active_collaborations": active_collaborations,
        "unresolved_reports": 0 # Not supported yet
    }

@router.get("/users")
def get_users(
    skip: int = 0, 
    limit: int = 100, 
    search: Optional[str] = None,
    role: Optional[str] = None,
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(get_current_admin_user)
):
    query = db.query(models.User)
    
    if search:
        query = query.filter(
            (models.User.full_name.ilike(f"%{search}%")) |
            (models.User.email.ilike(f"%{search}%"))
        )
    
    if role:
        query = query.filter(models.User.role == role)
        
    total = query.count()
    users = query.offset(skip).limit(limit).all()
    
    # Returning a basic dict structure instead of full schemas for simplicity and backwards compatibility
    return {
        "items": [{
            "id": u.id,
            "email": u.email,
            "full_name": u.full_name,
            "role": u.role,
            "is_active": u.is_active,
            "created_at": u.created_at
        } for u in users],
        "total": total
    }

@router.get("/campaigns")
def get_campaigns(
    skip: int = 0,
    limit: int = 100,
    status: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_admin_user)
):
    query = db.query(models.Campaign)
    
    if status:
        query = query.filter(models.Campaign.status == status)
        
    total = query.count()
    campaigns = query.offset(skip).limit(limit).all()
    
    return {
        "items": [{
            "id": c.id,
            "title": c.title,
            "brand_name": c.brand_name,
            "status": c.status,
            "budget": c.budget,
            "created_at": c.created_at
        } for c in campaigns],
        "total": total
    }

@router.get("/health")
def check_health(current_user: models.User = Depends(get_current_admin_user)):
    return {
        "status": "ok",
        "api_version": "1.0",
        "database": "connected"
    }
