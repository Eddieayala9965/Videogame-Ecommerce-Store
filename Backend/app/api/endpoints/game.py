from fastapi import APIRouter, Depends, HTTPException
from app.core.rawg_api import get_game_details, search_games, get_creator_roles

router = APIRouter()

router.get("/games/{game_slug}")
async def fetch_game_details(game_slug: str):
    game_details = get_game_details(game_slug)
    if not game_details:
        raise HTTPException(status_code=404, detail="Game not found")
    return game_details

router.get("/games/search")
async def search_for_games(query: str, page: int = 1):
    search_results = search_games(query, page)
    if not search_results:
        raise HTTPException(status_code=404, detail="No games found")
    return search_results

router.get("/creator-roles/")
async def fetch_creator_roles():
    roles = get_creator_roles()
    if not roles:
        raise HTTPException(status_code=404, detail="Creator roles not found")
    return roles