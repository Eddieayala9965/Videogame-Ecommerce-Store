from pydantic import BaseModel, EmailStr, Field 
from typing import Optional, List
from uuid import UUID




class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str



class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    is_active: Optional[bool] = True
    profile_picture: Optional[str] = None

class UserOut(BaseModel):
    id: UUID
    username: str
    email: EmailStr
    is_active: bool
    profile_picture: Optional[str]  

    class Config:
        from_attributes = True

class CartBase(BaseModel):
    gameID: str
    title: str  
    price: float  
    quantity: int = Field(..., gt=0)  
    image_url: Optional[str]
    user_id: UUID  

class CartOut(CartBase):
    id: UUID
    user_id: UUID

    class Config:
        from_attributes = True

class CartUpdate(BaseModel):
    quantity: Optional[int]

    class Config:
        from_attributes = True



# Define the schema
class OrderBase(BaseModel):
    gameID: str
    title: str  
    price: float  
    quantity: int
    image_url: Optional[str] = None
    total_price: float
    status: Optional[str] = "Pending"
    user_id: UUID  # Keep user_id required



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


class UserDisplay(BaseModel):
    username: str
    email: EmailStr
    profile_picture: Optional[str]

    class Config:
        from_attributes = True


class TokenData(BaseModel):
    username: str
    email: EmailStr
    profile_picture: Optional[str]

    class Config:
        from_attributes = True