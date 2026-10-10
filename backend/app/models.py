from sqlalchemy import Column, String, Integer, Boolean, ForeignKey, Float, Text, JSON, DateTime, UniqueConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    phone_number = Column(String)
    role = Column(String, nullable=False) # 'business' or 'creator'
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    business_profile = relationship("BusinessProfile", back_populates="user", uselist=False)
    creator_profile = relationship("CreatorProfile", back_populates="user", uselist=False)
    notifications = relationship("Notification", back_populates="user")

class BusinessProfile(Base):
    __tablename__ = "business_profiles"
    
    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), unique=True)
    company_name = Column(String)
    industry = Column(String)
    website = Column(String)
    location = Column(String)
    logo_url = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    user = relationship("User", back_populates="business_profile")
    campaigns = relationship("Campaign", back_populates="business_profile")
    shortlists = relationship("Shortlist", back_populates="business_profile")

class CreatorProfile(Base):
    __tablename__ = "creator_profiles"
    
    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), unique=True)
    handle = Column(String)
    bio = Column(Text)
    avatar_url = Column(String)
    primary_niche = Column(String)
    niches = Column(JSON) # List of strings
    location = Column(String)
    audience_size = Column(String)
    total_followers = Column(Integer, default=0)
    engagement_rate = Column(Float, default=0.0)
    pricing_range = Column(String)
    min_budget = Column(Integer, default=0)
    max_budget = Column(Integer, default=0)
    rating = Column(Float, default=0.0)
    review_count = Column(Integer, default=0)
    verified = Column(Boolean, default=False)
    available = Column(Boolean, default=True)
    demographics = Column(JSON) # dict
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    user = relationship("User", back_populates="creator_profile")
    social_accounts = relationship("CreatorSocialAccount", back_populates="creator_profile")
    portfolio = relationship("PortfolioItem", back_populates="creator_profile")
    applications = relationship("Application", back_populates="creator_profile")
    invitations = relationship("Invitation", back_populates="creator_profile")

class SocialPlatform(Base):
    __tablename__ = "social_platforms"
    id = Column(String, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    slug = Column(String, unique=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class CreatorSocialAccount(Base):
    __tablename__ = "creator_social_accounts"
    id = Column(String, primary_key=True, index=True)
    creator_profile_id = Column(String, ForeignKey("creator_profiles.id"))
    platform_id = Column(String, ForeignKey("social_platforms.id"))
    profile_url = Column(String)
    handle = Column(String)
    
    creator_profile = relationship("CreatorProfile", back_populates="social_accounts")
    platform = relationship("SocialPlatform")

class PortfolioItem(Base):
    __tablename__ = "portfolio_items"
    
    id = Column(String, primary_key=True, index=True)
    creator_profile_id = Column(String, ForeignKey("creator_profiles.id"))
    title = Column(String, nullable=False)
    platform = Column(String, nullable=False)
    url = Column(String, nullable=False)
    views_or_reach = Column(String)
    thumbnail = Column(String)
    
    creator_profile = relationship("CreatorProfile", back_populates="portfolio")

class Campaign(Base):
    __tablename__ = "campaigns"
    
    id = Column(String, primary_key=True, index=True)
    business_profile_id = Column(String, ForeignKey("business_profiles.id"))
    title = Column(String, nullable=False)
    brand_name = Column(String, nullable=False)
    brand_logo = Column(String)
    description = Column(Text, nullable=False)
    objective = Column(String)
    target_audience = Column(String)
    preferred_niche = Column(String)
    platforms = Column(JSON)
    budget = Column(Integer, nullable=False)
    budget_display = Column(String)
    start_date = Column(String)
    end_date = Column(String)
    deadline = Column(String)
    deliverables = Column(JSON)
    additional_instructions = Column(Text)
    status = Column(String, default="Draft")
    applications_count = Column(Integer, default=0)
    created_at = Column(String)
    
    business_profile = relationship("BusinessProfile", back_populates="campaigns")
    applications = relationship("Application", back_populates="campaign")
    invitations = relationship("Invitation", back_populates="campaign")

class Application(Base):
    __tablename__ = "applications"
    
    id = Column(String, primary_key=True, index=True)
    campaign_id = Column(String, ForeignKey("campaigns.id"))
    creator_profile_id = Column(String, ForeignKey("creator_profiles.id"))
    proposal = Column(Text)
    proposed_price = Column(Integer)
    portfolio_link = Column(String)
    availability = Column(String)
    status = Column(String, default="Applied")
    submitted_at = Column(String)
    feedback_notes = Column(Text)
    
    campaign = relationship("Campaign", back_populates="applications")
    creator_profile = relationship("CreatorProfile", back_populates="applications")

class Invitation(Base):
    __tablename__ = "invitations"
    
    id = Column(String, primary_key=True, index=True)
    campaign_id = Column(String, ForeignKey("campaigns.id"))
    creator_profile_id = Column(String, ForeignKey("creator_profiles.id"))
    business_profile_id = Column(String, ForeignKey("business_profiles.id"))
    status = Column(String, default="Pending")
    notes = Column(Text)
    sent_at = Column(String)
    
    campaign = relationship("Campaign", back_populates="invitations")
    creator_profile = relationship("CreatorProfile", back_populates="invitations")
    business_profile = relationship("BusinessProfile")

class Collaboration(Base):
    __tablename__ = "collaborations"
    
    id = Column(String, primary_key=True, index=True)
    campaign_id = Column(String, ForeignKey("campaigns.id"))
    business_profile_id = Column(String, ForeignKey("business_profiles.id"))
    creator_profile_id = Column(String, ForeignKey("creator_profiles.id"))
    deliverables = Column(JSON)
    due_date = Column(String)
    progress_percentage = Column(Integer, default=0)
    progress_status = Column(String, default="Not Started")
    submission_notes = Column(Text)
    submitted_url = Column(String)

class Shortlist(Base):
    __tablename__ = "shortlists"
    id = Column(String, primary_key=True, index=True)
    business_profile_id = Column(String, ForeignKey("business_profiles.id"))
    creator_profile_id = Column(String, ForeignKey("creator_profiles.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    __table_args__ = (UniqueConstraint('business_profile_id', 'creator_profile_id', name='_business_creator_uc'),)
    
    business_profile = relationship("BusinessProfile", back_populates="shortlists")
    creator_profile = relationship("CreatorProfile")

class Notification(Base):
    __tablename__ = "notifications"
    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"))
    title = Column(String)
    message = Column(Text)
    type = Column(String)
    read = Column(Boolean, default=False)
    link = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    user = relationship("User", back_populates="notifications")
