from .api_services import ApiService

class WeatherService:
    """ Service voor weerdata API """
    
    def __init__(self):
        self.api = ApiService("https://api.weatherapi.com/v1/", "JOUW_API_KEY")

    def get_current_weather(self, city):
        """ Haal de huidige weerdata op voor een stad """
        endpoint = "current.json"
        params = {"q": city}
        return self.api.get(endpoint, params)
