from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from app.crud import get_cart_items, add_to_cart, update_cart_item, delete_cart_item_from_db
from app.schemas import CartBase, CartOut, CartUpdate
from app.db import get_db
from uuid import UUID
from app.models import Cart

router = APIRouter()

@router.get("/", response_model=List[CartOut])
async def read_cart_items(user_id: UUID, db: AsyncSession = Depends(get_db)):
    return await get_cart_items(db, user_id)


@router.post("/", response_model=CartOut)
async def add_item_to_cart(
    cart_item: CartBase,
    db: AsyncSession = Depends(get_db)
):
    user_id = cart_item.user_id
    if not user_id:
        raise HTTPException(status_code=400, detail="user_id is required")
    
    return await add_to_cart(db, user_id, cart_item)


@router.put("/{cart_id}", response_model=CartOut)
async def update_cart_item_quantity(cart_id: UUID, cart_update: CartUpdate, db: AsyncSession = Depends(get_db)):
    cart_item = await update_cart_item(db, cart_id, cart_update)
    if not cart_item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cart item not found")
    return cart_item

@router.delete("/{cart_id}", response_model=CartOut)
async def delete_cart_item(cart_id: UUID, db: AsyncSession = Depends(get_db)):
    cart_item = await delete_cart_item_from_db(db, cart_id)
    if not cart_item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cart item not found")
    return cart_item


@router.put("/{cart_id}/increment", response_model=CartOut)
async def increment_cart_item_quantity(cart_id: UUID, db: AsyncSession = Depends(get_db)):
    cart_item = await db.get(Cart, cart_id)
    if not cart_item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cart item not found")
    
    cart_item.quantity += 1
    await db.commit()
    await db.refresh(cart_item)
    return cart_item

@router.put("/{cart_id}/decrement", response_model=CartOut)
async def decrement_cart_item_quantity(cart_id: UUID, db: AsyncSession = Depends(get_db)):
    cart_item = await db.get(Cart, cart_id)
    if not cart_item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cart item not found")

    if cart_item.quantity > 1:
        cart_item.quantity -= 1
    await db.commit()
    await db.refresh(cart_item)
    return cart_item
    return cart_item