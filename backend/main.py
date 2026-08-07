from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.core.config import settings
from backend.core.logging import logger
from backend.api.v1.router import api_router
from core.database import engine 
from models import prospecto    


prospecto.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    description="ASYS Intelligence Platform (AIP) - Backend Core Architecture"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API v1 Router
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.on_event("startup")
async def startup_event():
    logger.info("Initializing ASYS Intelligence Platform Backend Services...")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("Shutting down ASYS Intelligence Platform Backend Services...")
