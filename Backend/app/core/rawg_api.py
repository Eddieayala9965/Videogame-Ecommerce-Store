import requests
import os
from dotenv import load_dotenv
from typing import Optional, Dict, Any

load_dotenv()

RAWG_API_KEY = os.getenv("RAWG_API_KEY")
BASE_URL = "https://api.rawg.io/api"

def get_game_details(game_identifier: str) -> Optional[Dict[str, Any]]:
    """Fetch game details from RAWG API using the game slug or name."""
    
    if game_identifier.isalnum():
        url = f"{BASE_URL}/games/{game_identifier}?key={RAWG_API_KEY}"
    else:
        url = f"{BASE_URL}/games?search={game_identifier}&key={RAWG_API_KEY}"
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Error fetching game details: {e}")
        return None

def search_games(query: str, page: int = 1) -> Optional[Dict[str, Any]]:
    """Search for games using the RAWG API."""
    
    url = f"{BASE_URL}/games?search={query}&page={page}&key={RAWG_API_KEY}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Error searching for games: {e}")
        return None

def get_creator_roles() -> Optional[Dict[str, Any]]:
    """Fetch creator roles from RAWG API."""
    url = f"{BASE_URL}/creator-roles?key={RAWG_API_KEY}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Error fetching creator roles: {e}")
        return None