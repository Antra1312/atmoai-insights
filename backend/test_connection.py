import requests

def test_health(url='http://localhost:8000'):
    try:
        r = requests.get(f"{url}/health", timeout=3)
        print('status', r.status_code, r.json())
    except Exception as e:
        print('error', e)

if __name__ == '__main__':
    test_health()
