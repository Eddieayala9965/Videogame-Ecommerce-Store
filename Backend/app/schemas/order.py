from pydantic import BaseModel
from typing import Optional
from uuid import UUID

class OrderBase(BaseModel):
    product_id: UUID
    quantity: int
    status: Optional[str] = "Pending"

class OrderOut(BaseModel):
    id: UUID
    product_id: UUID
    quantity: int
    status: str
    user_id: UUID

    class Config:
        from_attributes = True