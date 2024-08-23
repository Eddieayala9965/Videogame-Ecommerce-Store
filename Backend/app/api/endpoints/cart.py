from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import List
from sqlalchemy.ext.asyncio import AsyncSession
from app.crud import get_cart_items, add_to_cart, update_cart_item, delete_cart_item
from app.schemas import CartBase, CartOut
from app.db import get_db
from uuid import UUID

router = APIRouter()

@router.get("/", response_model=List[CartOut])
async def read_cart_items(user_id: UUID, db: AsyncSession = Depends(get_db)):
    return await get_cart_items(db, user_id)

@router.post("/{cart_id}", response_model=CartOut)
async def add_item_to_cart(cart_item: CartBase, user_id: UUID, db: AsyncSession = Depends(get_db)):
    return await add_to_cart(db, user_id, cart_item)

@router.put("/{cart_id}", response_model=CartOut)
async def update_cart_item_quantity(cart_id: UUID, cart_update: CartBase, db: AsyncSession = Depends(get_db)):
    cart_item = await update_cart_item(db, cart_id, cart_update)
    if not cart_item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cart item not found")
    return cart_item

@router.delete("/{cart_id}", response_model=CartOut)
async def delete_cart_item(cart_id: UUID, db: AsyncSession = Depends(get_db)):
    cart_item = await delete_cart_item(db, cart_id)
    if not cart_item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cart item not found")
    return cart_item