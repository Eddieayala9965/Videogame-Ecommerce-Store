import requests
from typing import Optional, Dict, Any

BASE_URL = "https://www.cheapshark.com/api/1.0"

def search_games(query: str) -> Optional[Dict[str, Any]]:
    """Search for games using the CheapShark API"""
    
    url = f"{BASE_URL}/games?title={query}"
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Error searching for games: {e}")
        return None

def get_deals(game_id: str) ->  Optional[Dict[str, Any]]:
    """Fetch deals for a game using the cheapshark API"""
    
    url = f"{BASE_URL}/deals?id={game_id}"
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.ResponseException as e:
        print(f"Error fetching deals: {e}")
        return None