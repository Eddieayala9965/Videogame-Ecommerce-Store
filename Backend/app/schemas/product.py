from pydantic import BaseModel
from typing import Optional
from uuid import UUID

class ProductBase(BaseModel):
    name: str
    description: str
    price: float
    category: str
    image_url: Optional[str] = None

class ProductOut(ProductBase):
    id: UUID
    owner_id: UUID

    class Config:
        from_attributes = True