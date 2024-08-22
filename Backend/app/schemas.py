from pydantic import BaseModel, EmailStr
from typing import Optional
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



class ProductBase(BaseModel):
    name: str
    description: str
    price: float
    image_url: Optional[str]

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str]
    description: Optional[str]
    price: Optional[float]
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

class OrderCreate(OrderBase):
    pass

class OrderUpdate(BaseModel):
    product_id: Optional[UUID]
    quantity: Optional[int]
    status: Optional[str]

class OrderOut(OrderBase):
    id: UUID
    user_id: UUID

    class Config:
        from_attributes = True


class ReviewBase(BaseModel):
    product_id: UUID
    rating: int
    comment: str

class ReviewCreate(ReviewBase):
    pass

class ReviewUpdate(BaseModel):
    product_id: Optional[UUID]
    rating: Optional[int]
    comment: Optional[str]

class ReviewOut(ReviewBase):
    id: UUID
    user_id: UUID

    class Config:
        from_attributes = True