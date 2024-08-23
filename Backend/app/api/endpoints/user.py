from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.crud import get_user, create_user, update_user, delete_user
from app.schemas import UserCreate, UserUpdate, UserOut
from app.db import get_db
from uuid import UUID

router = APIRouter()

@router.post("/", response_model=UserOut, status_code=status.HTTP_201_CREATED)
async def create_new_user(user: UserCreate, db: AsyncSession = Depends(get_db)):
   existing_user = await get_user(db, user_id=user.id)
   if existing_user:
       raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists")
   return await create_user(db, user)

@router.get("/{user_id}", response_model=UserOut)
async def read_user(user_id: UUID, db: AsyncSession = Depends(get_db)):
    user = await get_user(db, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user

@router.put("/{user_id}", response_model=UserOut)
async def update_existing_user(user_id: UUID, user_update: UserUpdate, db: AsyncSession = Depends(get_db)):
    user = await update_user(db, user_id, user_update)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user

@router.delete("/{user_id}", response_model=UserOut)
async def delete_existing_user(user_id: UUID, db: AsyncSession = Depends(get_db)):
    user = await delete_user(db, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    return user