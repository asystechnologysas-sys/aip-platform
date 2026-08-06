from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class UserBase(BaseModel):
    nombre: str
    email: EmailStr
    departamento: Optional[str] = None
    is_active: bool = True

class UserCreate(UserBase):
    password: str
    rol_id: str

class UserResponse(UserBase):
    id: str
    rol_id: str
    created_at: datetime

    class Config:
        from_attributes = True
