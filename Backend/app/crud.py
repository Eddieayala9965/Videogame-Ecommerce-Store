from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from .models import User, Product, Order, Review
from .schemas import UserCreate, UserOut, ProductBase, ProductOut, OrderBase, OrderOut, ReviewBase, ReviewOut
from uuid import UUID

async def get_user(db: AsyncSession, user_id: UUID) -> UserOut:
    user = await db.get(User, user_id)
    if not user:
        return None
    return UserOut.from_attributes(user)

async def get_user_by_email(db: AsyncSession, email: str) -> UserOut:
    stmt = select(User).where(User.email == email)
    result = await db.execute(stmt)
    user = result.scalar().first()
    return UserOut.from_attributes(user)

async def create_user(db: AsyncSession, user_data: UserCreate) -> UserOut:
    user = User(**user_data.model_dump())
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return UserOut.from_attributes(user)

async def update_user(db: AsyncSession, user_id: UUID, updated_user_data: UserCreate) -> UserOut:

