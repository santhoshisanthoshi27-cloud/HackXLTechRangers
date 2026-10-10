import pytest
from fastapi.testclient import TestClient
from app.main import app
from app import utils
from datetime import timedelta
from app.routers.auth import get_current_user

client = TestClient(app)

def mock_get_current_user_biz():
    class MockUser:
        role = "business"
    return MockUser()

def mock_get_current_user_creator():
    class MockUser:
        role = "creator"
    return MockUser()

def test_unauthenticated_visitor_cannot_access_admin():
    response = client.get("/api/v1/admin/overview")
    assert response.status_code == 401

def test_business_owner_cannot_access_admin():
    app.dependency_overrides[get_current_user] = mock_get_current_user_biz
    response = client.get("/api/v1/admin/overview")
    assert response.status_code == 403
    assert response.json()["detail"] == "The user doesn't have enough privileges"
    app.dependency_overrides = {}

def test_creator_cannot_access_admin():
    app.dependency_overrides[get_current_user] = mock_get_current_user_creator
    response = client.get("/api/v1/admin/overview")
    assert response.status_code == 403
    assert response.json()["detail"] == "The user doesn't have enough privileges"
    app.dependency_overrides = {}

# Note: We cannot easily test successful admin access here without mocking the database user object,
# because get_current_user hits the database to find the user. If the DB doesn't have the user, it returns 401.
# So we mock a DB-level token response if possible, or just skip full-admin test if we can't create an admin in the test DB easily.
# But we can test the registration blocking!

def test_cannot_register_as_admin():
    response = client.post("/api/v1/auth/register", json={
        "email": "hacker@test.com",
        "full_name": "Hacker",
        "role": "admin",
        "password": "password123"
    })
    assert response.status_code == 403
    assert response.json()["detail"] == "Cannot register as admin"
