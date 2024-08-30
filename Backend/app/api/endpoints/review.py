from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.crud import create_review, get_reviews_for_game, update_review, delete_review
from app.schemas import ReviewBase, ReviewOut
from app.db import get_db
from uuid import UUID

router = APIRouter()

@router.post("/", response_model=ReviewOut, status_code=status.HTTP_201_CREATED)
async def create_new_review(review: ReviewBase, user_id: UUID, db: AsyncSession = Depends(get_db)):
    return await create_review(db, user_id, review)

@router.get("/game/{gameID}", response_model=List[ReviewOut])
async def read_reviews_for_game(gameID: str, db: AsyncSession = Depends(get_db)):
    return await get_reviews_for_game(db, gameID)

@router.put("/{review_id}", response_model=ReviewOut)
async def update_review(review_id: UUID, review_update: ReviewBase, db: AsyncSession = Depends(get_db)):
    review = await update_review(db, review_id, review_update)
    if not review:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Review not found")
    return review

@router.delete("/{review_id}", response_model=ReviewOut)
async def delete_review(review_id: UUID, db: AsyncSession = Depends(get_db)):
    review = await delete_review(db, review_id)
    if not review:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Review not found")
    return review