import os
import sys
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

load_dotenv()

direct_url = os.getenv("DIRECT_URL")
if not direct_url:
    print("MISSING DIRECT_URL")
    sys.exit(1)

if direct_url.startswith("postgresql://"):
    direct_url = direct_url.replace("postgresql://", "postgresql+psycopg2://")

try:
    engine = create_engine(direct_url)
    with engine.connect() as conn:
        # Check existing tables
        tables_query = text("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        """)
        result = conn.execute(tables_query)
        tables = [row[0] for row in result]
        
        expected_tables = [
            "users", "business_profiles", "creator_profiles", 
            "social_platforms", "creator_social_accounts", 
            "campaigns", "applications", "invitations", 
            "collaborations", "shortlists", "notifications", "portfolio_items"
        ]
        
        found = [t for t in expected_tables if t in tables]
        
        # Check Alembic history
        alembic_history = []
        if "alembic_version" in tables:
            v_result = conn.execute(text("SELECT version_num FROM alembic_version"))
            alembic_history = [row[0] for row in v_result]
            
        print(f"EXISTING_TABLES:{','.join(tables)}")
        print(f"FOUND_EXPECTED:{','.join(found)}")
        print(f"ALEMBIC_VERSION:{','.join(alembic_history)}")
        
        # Check rows
        for t in found:
            row_count = conn.execute(text(f"SELECT COUNT(*) FROM {t}")).scalar()
            print(f"ROWS_IN_{t}: {row_count}")
        
except Exception as e:
    print(f"ERROR: {str(e)[:100]}")
