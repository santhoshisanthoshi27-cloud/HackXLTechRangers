import requests

r = requests.post('http://localhost:8000/api/v1/auth/login', data={'username':'admin@necto.com','password':'admin123'})
print("Login status:", r.status_code)
if r.status_code == 200:
    token = r.json().get('access_token')
    print("Got token.")
    r2 = requests.get('http://localhost:8000/api/v1/admin/overview', headers={'Authorization': f'Bearer {token}'})
    print("Admin Overview status:", r2.status_code)
    print(r2.json())
else:
    print(r.json())
