from fastapi import APIRouter, Depends, HTTPException
from app.core.rawg_api import get_game_details, search_games, get_creator_roles