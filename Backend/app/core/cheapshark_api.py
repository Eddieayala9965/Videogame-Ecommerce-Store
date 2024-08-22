import httpx
from typing import Optional, List, Dict, Any

BASE_URL = "https://www.cheapshark.com/api/1.0"

async def search_games(query: str) -> Optional[List[Dict[str, Any]]]:
    """Search for games on CheapShark by title."""
    url = f"{BASE_URL}/games?title={query}&limit=60"
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
            response.raise_for_status()
            return response.json()
    except httpx.RequestError as e:
        print(f"Error searching for games: {e}")
        return None