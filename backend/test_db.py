import os
import sys
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

# Load environment variables
load_dotenv(override=True)

db_url = os.getenv("DATABASE_URL")
direct_url = os.getenv("DIRECT_URL")
jwt = os.getenv("JWT_SECRET_KEY")

if not db_url or not direct_url or not jwt:
    print("MISSING_ENV_VARS")
    sys.exit(1)

def test_conn(url, name):
    try:
        # Ensure we use psycopg2 driver
        if url.startswith("postgresql://"):
            url = url.replace("postgresql://", "postgresql+psycopg2://")
            if "?pgbouncer=true" in url:
                url = url.replace("?pgbouncer=true", "")
        
        engine = create_engine(url)
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        print(f"SUCCESS: {name}")
    except Exception as e:
        error_msg = str(e)
        # Sanitize sensitive URL data from error string if present
        if db_url in error_msg:
            error_msg = error_msg.replace(db_url, "***HIDDEN_DATABASE_URL***")
        if direct_url in error_msg:
            error_msg = error_msg.replace(direct_url, "***HIDDEN_DIRECT_URL***")
        if "<URL_ENCODED_PASSWORD>" in error_msg:
            print(f"FAILED: {name} - Placeholder <URL_ENCODED_PASSWORD> detected in connection string. You must replace it with the actual password.")
        else:
            print(f"FAILED: {name} - {error_msg.split('password')[0]}... [Sanitized Error]")

test_conn(db_url, "DATABASE_URL (Transaction Pooler)")
test_conn(direct_url, "DIRECT_URL (Session Pooler)")
