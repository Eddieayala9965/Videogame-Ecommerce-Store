from pydantic import BaseModel, EmailStr
from typing import Optional
from uuid import UUID

class UserBase(BaseModel):
    username: str
    email: EmailStr
    password: str
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