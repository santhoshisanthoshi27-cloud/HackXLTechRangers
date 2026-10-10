from pydantic import BaseModel, EmailStr
from typing import List, Optional, Any
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    role: str

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: str
    phone_number: Optional[str] = None
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    location: Optional[str] = None
    
    company_name: Optional[str] = None
    industry: Optional[str] = None
    website: Optional[str] = None
    
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
    rating: Optional[float] = None
    review_count: Optional[int] = None
    verified: Optional[bool] = None
    available: Optional[bool] = None
    demographics: Optional[dict] = None
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class CampaignBase(BaseModel):
    title: str
    brand_name: str
    description: str
    budget: int
    platforms: List[str]
    deliverables: List[str]

class CampaignCreate(CampaignBase):
    pass

class CampaignUpdate(BaseModel):
    title: Optional[str] = None
    brand_name: Optional[str] = None
    description: Optional[str] = None
    budget: Optional[int] = None
    platforms: Optional[List[str]] = None
    deliverables: Optional[List[str]] = None
    status: Optional[str] = None

class CampaignResponse(CampaignBase):
    id: str
    business_profile_id: str
    brand_logo: Optional[str] = None
    objective: Optional[str] = None
    target_audience: Optional[str] = None
    preferred_niche: Optional[str] = None
    budget_display: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    deadline: Optional[str] = None
    additional_instructions: Optional[str] = None
    status: str
    applications_count: int
    created_at: Optional[str] = None

    class Config:
        from_attributes = True
