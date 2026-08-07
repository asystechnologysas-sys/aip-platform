from fastapi import APIRouter
from backend.api.v1.endpoints import auth, users, system
from api.v1.endpoints import prospeccion


api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["Autenticación"])
api_router.include_router(users.router, prefix="/users", tags=["Usuarios"])
api_router.include_router(system.router, prefix="/system", tags=["Estado del Sistema"])
api_router.include_router(prospeccion.router, prefix="/prospeccion", tags=["Prospección"])
