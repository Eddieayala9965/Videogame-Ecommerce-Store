from sqlalchemy.ext.asyncio import AsyncSession
from .models import User, Product, Order, Review
from uuid import UUID

async def get_user(db: AsyncSession, user_id: UUID):
    return await db.get(User, user_id)

async def create_user(db: AsyncSession, user: User):
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user


