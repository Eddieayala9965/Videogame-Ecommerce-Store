from sqlalchemy import Column, String, Boolean, Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    profile_picture = Column(String, nullable=True)
    
    products = relationship("Product", back_populates="owner")
    orders = relationship("Order", back_populates="user")
    reviews = relationship("Review", back_populates="user")
    
    