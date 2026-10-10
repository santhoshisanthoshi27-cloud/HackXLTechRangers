import sqlite3
import requests

def test():
    conn = sqlite3.connect('necto.db')
    cursor = conn.cursor()
    cursor.execute("UPDATE users SET role='business' WHERE email='admin@necto.com'")
    conn.commit()
    
    r = requests.post('http://127.0.0.1:8000/api/v1/auth/login', data={'username':'admin@necto.com', 'password':'admin123'})
    token = r.json().get('access_token')
    headers = {'Authorization': f'Bearer {token}'}

    payload = {
        'title': 'Test Campaign',
        'brand_name': 'Test Brand',
        'description': 'test description',
        'budget': 1000,
        'platforms': ['Instagram'],
        'deliverables': ['test deliverable']
    }
    res = requests.post('http://127.0.0.1:8000/api/v1/campaigns/', headers=headers, json=payload)
    print("Create Campaign:", res.status_code)
    print(res.text)

    cursor.execute("UPDATE users SET role='admin' WHERE email='admin@necto.com'")
    conn.commit()
    conn.close()

if __name__ == '__main__':
    test()
