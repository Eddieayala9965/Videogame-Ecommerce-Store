from pydantic import BaseModel, EmailStr
from typing import Optional, List
from uuid import UUID


class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    username: Optional[str]
    email: Optional[EmailStr]
    password: Optional[str]  
    is_active: Optional[bool] = True
    profile_picture: Optional[str]

class UserOut(UserBase):
    id: UUID
    is_active: bool
    profile_picture: Optional[str]

    class Config:
        from_attributes = True


class CartBase(BaseModel):
    gameID: str
    title: str  
    price: float  
    quantity: int
    image_url: Optional[str] 

class CartOut(CartBase):
    id: UUID
    user_id: UUID

    class Config:
        from_attributes = True

class CartUpdate(BaseModel):
    quantity: Optional[int]

    class Config:
        from_attributes = True


class OrderBase(BaseModel):
    gameID: str
    title: str  
    price: float  
    quantity: int
    image_url: Optional[str]  
    total_price: float
    status: Optional[str] = "Pending"

class OrderOut(OrderBase):
    id: UUID
    user_id: UUID

    class Config:
        from_attributes = True

class OrderUpdate(BaseModel):
    status: Optional[str]

    class Config:
        from_attributes = True


class ReviewBase(BaseModel):
    gameID: str
    rating: int
    comment: str

class ReviewOut(ReviewBase):
    id: UUID
    user_id: UUID

    class Config:
        from_attributes = True