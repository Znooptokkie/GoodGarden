import requests

class ApiService:
    """ Klasse om externe API-verzoeken te verwerken """

    def __init__(self, base_url, api_key=None):
        self.base_url = base_url
        self.api_key = api_key

    def get(self, endpoint, params=None):
        """ Voert een GET-request uit naar de API """
        url = f"{self.base_url}{endpoint}"
        headers = {"Authorization": f"Bearer {self.api_key}"} if self.api_key else {}
        
        try:
            response = requests.get(url, headers=headers, params=params)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"API Error: {e}")
            return None

    def post(self, endpoint, data=None):
        """ Voert een POST-request uit naar de API """
        url = f"{self.base_url}{endpoint}"
        headers = {
            "Authorization": f"Bearer {self.api_key}" if self.api_key else "",
            "Content-Type": "application/json"
        }

        try:
            response = requests.post(url, json=data, headers=headers)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"API Error: {e}")
            return None
