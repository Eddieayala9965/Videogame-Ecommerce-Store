from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.exc import NoResultFound
from uuid import UUID
from .models import User, Cart, Order, Review
from .schemas import (
    UserCreate, UserUpdate,
    CartBase, CartUpdate,
    OrderBase, OrderUpdate,
    ReviewBase
)


# User CRUD Operations


async def get_user(db: AsyncSession, user_id: UUID):
    """Fetch a user by their UUID."""
    return await db.get(User, user_id)

async def create_user(db: AsyncSession, user: UserCreate):
    """Create a new user."""
    db_user = User(
        username=user.username,
        email=user.email,
        hashed_password=user.password  
    )
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user

async def update_user(db: AsyncSession, user_id: UUID, user_update: UserUpdate):
    """Update an existing user."""
    db_user = await get_user(db, user_id)
    if db_user is None:
        return None
    for key, value in user_update.dict(exclude_unset=True).items():
        setattr(db_user, key, value)
    await db.commit()
    await db.refresh(db_user)
    return db_user

async def delete_user(db: AsyncSession, user_id: UUID):
    """Delete a user by their UUID."""
    db_user = await get_user(db, user_id)
    if db_user is None:
        return None
    await db.delete(db_user)
    await db.commit()
    return db_user


# Cart CRUD Operations


async def get_cart_items(db: AsyncSession, user_id: UUID):
    """Fetch all cart items for a user."""
    stmt = select(Cart).where(Cart.user_id == user_id)
    result = await db.execute(stmt)
    return result.scalars().all()

async def add_to_cart(db: AsyncSession, user_id: UUID, cart_item: CartBase):
    """Add an item to the user's cart."""
    db_cart_item = Cart(
        user_id=user_id,
        gameID=cart_item.gameID,
        title=cart_item.title,
        price=cart_item.price,
        quantity=cart_item.quantity,
        image_url=cart_item.image_url
    )
    db.add(db_cart_item)
    await db.commit()
    await db.refresh(db_cart_item)
    return db_cart_item

async def update_cart_item(db: AsyncSession, cart_id: UUID, cart_update: CartUpdate):
    """Update the quantity of a cart item."""
    db_cart_item = await db.get(Cart, cart_id)
    if db_cart_item is None:
        return None
    for key, value in cart_update.dict(exclude_unset=True).items():
        setattr(db_cart_item, key, value)
    await db.commit()
    await db.refresh(db_cart_item)
    return db_cart_item

async def delete_cart_item(db: AsyncSession, cart_id: UUID):
    """Delete an item from the cart."""
    db_cart_item = await db.get(Cart, cart_id)
    if db_cart_item is None:
        return None
    await db.delete(db_cart_item)
    await db.commit()
    return db_cart_item


# Order CRUD Operations


async def create_order(db: AsyncSession, user_id: UUID, order: OrderBase):
    """Create a new order for the user."""
    db_order = Order(
        user_id=user_id,
        gameID=order.gameID,
        title=order.title,
        price=order.price,
        quantity=order.quantity,
        image_url=order.image_url,
        total_price=order.total_price
    )
    db.add(db_order)
    await db.commit()
    await db.refresh(db_order)
    return db_order

async def get_user_orders(db: AsyncSession, user_id: UUID):
    """Fetch all orders for a user."""
    stmt = select(Order).where(Order.user_id == user_id)
    result = await db.execute(stmt)
    return result.scalars().all()

async def update_order_status(db: AsyncSession, order_id: UUID, order_update: OrderUpdate):
    """Update the status of an order."""
    db_order = await db.get(Order, order_id)
    if db_order is None:
        return None
    for key, value in order_update.dict(exclude_unset=True).items():
        setattr(db_order, key, value)
    await db.commit()
    await db.refresh(db_order)
    return db_order

async def delete_order(db: AsyncSession, order_id: UUID):
    """Delete an order."""
    db_order = await db.get(Order, order_id)
    if db_order is None:
        return None
    await db.delete(db_order)
    await db.commit()
    return db_order


# Review CRUD Operations


async def create_review(db: AsyncSession, user_id: UUID, review: ReviewBase):
    """Create a new review."""
    db_review = Review(
        user_id=user_id,
        gameID=review.gameID,
        rating=review.rating,
        comment=review.comment
    )
    db.add(db_review)
    await db.commit()
    await db.refresh(db_review)
    return db_review

async def get_reviews_for_game(db: AsyncSession, gameID: str):
    """Fetch all reviews for a specific game."""
    stmt = select(Review).where(Review.gameID == gameID)
    result = await db.execute(stmt)
    return result.scalars().all()

async def update_review(db: AsyncSession, review_id: UUID, review_update: ReviewBase):
    """Update an existing review."""
    db_review = await db.get(Review, review_id)
    if db_review is None:
        return None
    for key, value in review_update.dict(exclude_unset=True).items():
        setattr(db_review, key, value)
    await db.commit()
    await db.refresh(db_review)
    return db_review

async def delete_review(db: AsyncSession, review_id: UUID):
    """Delete a review."""
    db_review = await db.get(Review, review_id)
    if db_review is None:
        return None
    await db.delete(db_review)
    await db.commit()
    return db_review