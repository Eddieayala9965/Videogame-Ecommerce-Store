from pydantic import BaseModel
from typing import Optional
from uuid import UUID

class ReviewBase(BaseModel):
    product_id: UUID
    rating: int
    comment: str

class ReviewOut(BaseModel):
    id: UUID
    product_id: UUID
    rating: int
    comment: str
    user_id: UUID

    class Config:
        from_attributes = True