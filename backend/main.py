from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.core.config import settings
from backend.api.v1.router import api_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
)

# Configurar CORS para que React pueda leer la API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cargar las rutas (Ya no creamos tablas aquí porque ya existen)
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
async def root():
    return {"status": "online", "message": "ASYS Intelligence API is running"}
