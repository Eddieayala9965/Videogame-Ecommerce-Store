from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from app.crud import create_order, get_user_orders
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

# Create order function



# @router.put("/{order_id}", response_model=OrderOut)
# async def update_order(order_id: UUID, order_update: OrderBase, db: AsyncSession = Depends(get_db)):
#     order = await update_order_status(db, order_id, order_update)
#     if not order:
#         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Order not found")
#     return order

# @router.delete("/{order_id}", response_model=OrderOut)
# async def delete_a_order(order_id: UUID, db: AsyncSession = Depends(get_db)):
#     order = await delete_order(db, order_id)
#     if not order:
#         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Order not found")
#     return order
    
