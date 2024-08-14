import requests
from typing import Optional, List, Dict, Any

BASE_URL = "https://www.cheapshark.com/api/1.0"

def search_games(query: str) -> Optional[List[Dict[str, Any]]]:
    """Search for games on CheapShark by title."""
    url = f"{BASE_URL}/games?title={query}&limit=60"
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Error searching for games: {e}")
        return None


