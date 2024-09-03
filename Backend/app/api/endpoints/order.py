from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from app.crud import create_order, get_user_orders, delete_order
from app.schemas import OrderBase
from ...db import get_db
from uuid import UUID

router = APIRouter()

@router.post("/", response_model=OrderBase, status_code=status.HTTP_201_CREATED)
async def create_new_order(order: OrderBase, db: AsyncSession = Depends(get_db)):
    return await create_order(db, order)

@router.get("/", response_model=List[OrderBase])
async def read_user_orders(user_id: UUID, db: AsyncSession = Depends(get_db)):
    return await get_user_orders(db, user_id)


@router.delete("/{order_id}")
async def delete_order(order_id: UUID, db: AsyncSession = Depends(get_db)):
    order = await delete_order(db, order_id)
    if not order:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Order not found")
    return order
    
