from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from .models import User, Product, Order, Review
from .schemas import UserCreate, UserUpdate, UserOut, ProductBase, ProductCreate, ProductUpdate, ProductOut, OrderBase, OrderCreate, OrderUpdate, OrderOut, ReviewBase, ReviewCreate, ReviewUpdate, ReviewOut
from core.cheapshark_api import search_games
from uuid import UUID

# user crud operations

async def get_user(db: AsyncSession, user_id: UUID) -> UserOut:
    user = await db.get(User, user_id)
    if not user:
        return None
    return UserOut.from_attributes(user)

async def get_user_by_email(db: AsyncSession, email: str) -> UserOut:
    stmt = select(User).where(User.email == email)
    result = await db.execute(stmt)
    user = result.scalars().first()
    return UserOut.from_attributes(user)

async def create_user(db: AsyncSession, user_data: UserCreate) -> UserOut:
    user = User(**user_data.model_dump())
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return UserOut.from_attributes(user)

async def update_user(db: AsyncSession, user_id: UUID, updated_user_data: UserUpdate) -> UserOut:
    user = await get_user(db, user_id)
    if user:
        for key, value in updated_user_data.model_dump(exclude_unset=True).items():
            setattr(user, key, value)
    await db.commit()
    await db.refresh(user)
    return UserOut.from_attributes(user)

async def delete_user(db: AsyncSession, user_id: UUID) -> UserOut:
    user = await get_user(db, user_id)
    if user:
        await db.delete(user)
        await db.commit()
    return UserOut.from_attributes(user)


# product crud operations

async def get_product(db: AsyncSession, product_id: UUID) -> ProductOut:
    product = await db.get(Product, product_id)
    if not product:
        return None
    return ProductOut.from_atrributes(product)

async def create_product