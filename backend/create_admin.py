import os
import sys
import uuid
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models import User
from app.utils import get_password_hash
from app.database import Base

from app.database import SessionLocal, Base, engine

def create_admin(email: str, password: str, full_name: str):
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.email == email).first()
        if user:
            print(f"User {email} already exists. Updating role to admin.")
            user.role = "admin"
            user.hashed_password = get_password_hash(password)
            db.commit()
            return
            
        new_admin = User(
            id=str(uuid.uuid4()),
            email=email,
            hashed_password=get_password_hash(password),
            full_name=full_name,
            role="admin",
            is_active=True
        )
        db.add(new_admin)
        db.commit()
        print(f"Admin user {email} created successfully.")
    except Exception as e:
        print(f"Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python create_admin.py <email> <password> <full_name>")
        sys.exit(1)
        
    create_admin(sys.argv[1], sys.argv[2], sys.argv[3])
