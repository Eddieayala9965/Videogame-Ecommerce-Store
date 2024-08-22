from sqlalchemy import Column, String, Boolean, Float, ForeignKey, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    profile_picture = Column(String, nullable=True)

    carts = relationship("Cart", back_populates="user")
    orders = relationship("Order", back_populates="user")
    reviews = relationship("Review", back_populates="user")

class Cart(Base):
    __tablename__ = "carts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    gameID = Column(String, nullable=False)  
    title = Column(String, nullable=False)  
    price = Column(Float, nullable=False) 
    quantity = Column(Integer, nullable=False, default=1)
    image_url = Column(String, nullable=True)  

    user = relationship("User", back_populates="carts")

class Order(Base):
    __tablename__ = "orders"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    gameID = Column(String, nullable=False)  
    title = Column(String, nullable=False)  
    price = Column(Float, nullable=False) 
    quantity = Column(Integer, nullable=False)
    image_url = Column(String, nullable=True)  
    total_price = Column(Float, nullable=False)
    status = Column(String, default="Pending")

    user = relationship("User", back_populates="orders")

class Review(Base):
    __tablename__ = "reviews"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    gameID = Column(String, nullable=False)  
    rating = Column(Integer, nullable=False)
    comment = Column(String, nullable=False)

    user = relationship("User", back_populates="reviews")