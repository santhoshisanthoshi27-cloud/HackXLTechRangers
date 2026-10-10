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
        print("=== TABLES ===")
        tables_q = text("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name")
        tables = [row[0] for row in conn.execute(tables_q)]
        for t in tables:
            print(f"Table: {t}")
            
        print("\n=== COLUMNS ===")
        cols_q = text("""
            SELECT table_name, column_name, data_type, is_nullable, column_default 
            FROM information_schema.columns 
            WHERE table_schema = 'public' 
            ORDER BY table_name, ordinal_position
        """)
        for row in conn.execute(cols_q):
            print(f"{row[0]}.{row[1]}: type={row[2]}, null={row[3]}, default={row[4]}")
            
        print("\n=== CONSTRAINTS (PK/FK/UNIQUE) ===")
        cons_q = text("""
            SELECT tc.table_name, tc.constraint_name, tc.constraint_type, kcu.column_name 
            FROM information_schema.table_constraints tc 
            JOIN information_schema.key_column_usage kcu 
              ON tc.constraint_name = kcu.constraint_name 
            WHERE tc.table_schema = 'public' 
            ORDER BY tc.table_name, tc.constraint_name
        """)
        for row in conn.execute(cons_q):
            print(f"{row[0]}: {row[2]} {row[1]} on {row[3]}")
            
        print("\n=== INDEXES ===")
        idx_q = text("""
            SELECT tablename, indexname, indexdef 
            FROM pg_indexes 
            WHERE schemaname = 'public'
            ORDER BY tablename, indexname
        """)
        for row in conn.execute(idx_q):
            print(f"{row[0]}: {row[1]} -> {row[2]}")

        print("\n=== ALEMBIC VERSION ===")
        if "alembic_version" in tables:
            v_result = conn.execute(text("SELECT version_num FROM alembic_version"))
            rows = list(v_result)
            if not rows:
                print("alembic_version is EMPTY")
            else:
                for row in rows:
                    print(f"Version: {row[0]}")
        else:
            print("alembic_version table does not exist")

except Exception as e:
    print(f"ERROR: {e}")
