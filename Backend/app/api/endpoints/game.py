from fastapi import APIRouter, HTTPException
from app.core.cheapshark_api import search_games, get_deals

router = APIRouter()

@router.get("/games/search")
async def search_for_games(query: str):
    search_results = search_games(query)
    if not search_results:
        raise HTTPException(status_code=404, detail="No games found")
    return search_results
