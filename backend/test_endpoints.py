import requests

BASE_URL = "http://127.0.0.1:8000/api/v1"

# 1. Register a test user
user_data = {
    "email": "test@business.com",
    "password": "password123",
    "full_name": "Test Business",
    "role": "business"
}
try:
    requests.post(f"{BASE_URL}/auth/register", json=user_data)
except:
    pass

# 2. Login to get token
login_data = {
    "username": "test@business.com",
    "password": "password123"
}
res = requests.post(f"{BASE_URL}/auth/login", data=login_data)
print("Login:", res.status_code, res.json())
token = res.json().get("access_token")
headers = {"Authorization": f"Bearer {token}"}


# 3. Create a campaign
campaign_data = {
    "title": "Test Campaign",
    "brand_name": "Test Brand",
    "description": "Test Desc",
    "budget": 1000,
    "platforms": ["Instagram"],
    "deliverables": ["1 Post"]
}
res = requests.post(f"{BASE_URL}/campaigns/", json=campaign_data, headers=headers)
print("Create:", res.status_code, res.json())
camp_id = res.json().get("id")

# 4. List campaigns
res = requests.get(f"{BASE_URL}/campaigns/", headers=headers)
print("List:", res.status_code, len(res.json()))

if camp_id:
    # 5. Update campaign
    update_data = {"status": "Active"}
    res = requests.put(f"{BASE_URL}/campaigns/{camp_id}", json=update_data, headers=headers)
    print("Update:", res.status_code, res.json())

    # Create user 2
    user2_data = {
        "email": "test2@business.com",
        "password": "password123",
        "full_name": "Test Business 2",
        "role": "business"
    }
    try:
        requests.post(f"{BASE_URL}/auth/register", json=user2_data)
    except:
        pass
    res2 = requests.post(f"{BASE_URL}/auth/login", data={"username": "test2@business.com", "password": "password123"})
    token2 = res2.json().get("access_token")
    headers2 = {"Authorization": f"Bearer {token2}"}

    # Verify unauthorized user cannot edit
    res_unauth = requests.put(f"{BASE_URL}/campaigns/{camp_id}", json={"status": "Closed"}, headers=headers2)
    print("Unauthorized Edit:", res_unauth.status_code, res_unauth.json())

    # Verify unauthorized user cannot delete
    res_unauth_del = requests.delete(f"{BASE_URL}/campaigns/{camp_id}", headers=headers2)
    print("Unauthorized Delete:", res_unauth_del.status_code, res_unauth_del.json())

    # 6. Delete campaign with correct user
    res = requests.delete(f"{BASE_URL}/campaigns/{camp_id}", headers=headers)
    print("Delete:", res.status_code, res.json())
