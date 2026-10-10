from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routers import auth, users, campaigns, applications, invitations, collaborations

import os

if os.getenv("DATABASE_URL", "").startswith("sqlite"):
    Base.metadata.create_all(bind=engine)

app = FastAPI(title="NECTO API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/v1/auth", tags=["Auth"])
app.include_router(users.router, prefix="/api/v1/users", tags=["Users"])
app.include_router(campaigns.router, prefix="/api/v1/campaigns", tags=["Campaigns"])
app.include_router(applications.router, prefix="/api/v1/applications", tags=["Applications"])
app.include_router(invitations.router, prefix="/api/v1/invitations", tags=["Invitations"])
app.include_router(collaborations.router, prefix="/api/v1/collaborations", tags=["Collaborations"])

from app.routers import admin
app.include_router(admin.router, prefix="/api/v1/admin", tags=["Admin"])

@app.get("/api/v1/health")
def health_check():
    return {"status": "ok"}
