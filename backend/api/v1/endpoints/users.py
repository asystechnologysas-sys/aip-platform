from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from backend.core.database import get_db
from backend.repositories.user_repository import UserRepository
from backend.schemas.user import UserResponse

router = APIRouter()

@router.get("/", response_model=List[UserResponse])
async def list_users(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_db)
):
    user_repo = UserRepository(db)
    return await user_repo.get_all(skip=skip, limit=limit)
