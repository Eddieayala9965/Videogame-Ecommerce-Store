from sqlalchemy import Column, String, Integer, Float, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class Product(Base):
    __tablename__ = "products"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    description = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    category = Column(String, nullable=False, index=True)
    image_url = Column(String, index=True)
    owner_id = Column(String, ForeignKey('users.id'))
    
    owner = relationship("User", back_populates="products")
    orders = relationship("Order", back_populates="product")
    reviews = relationship("Review", back_populates="product")
    
    