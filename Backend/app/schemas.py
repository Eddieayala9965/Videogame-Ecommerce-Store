from pydantic import BaseModel, EmailStr
from typing import Optional
from uuid import UUID

class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: UUID
    is_active: bool
    profile_picture: Optional[str]

    class Config:
        from_attributes = True


class ProductBase(BaseModel):
    name: str
    description: str
    price: float
    image_url: Optional[str]

class ProductOut(ProductBase):
    id: UUID
    owner_id: UUID

    class Config:
        from_attributes = True


class OrderBase(BaseModel):
    product_id: UUID
    quantity: int
    status: Optional[str] = "Pending"

class OrderOut(BaseModel):
    id: UUID
    user_id: UUID
    product_id: UUID
    quantity: int
    status: str

    class Config:
        from_attributes = True


class ReviewBase(BaseModel):
    product_id: UUID
    rating: int
    comment: str

class ReviewOut(ReviewBase):
    id: UUID
    user_id: UUID

    class Config:
        from_attributes = True
