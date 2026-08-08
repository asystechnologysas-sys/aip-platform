from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.core.database import get_db # <-- Agregar 'backend.'
from backend.schemas.prospecto import ProspectoBulk # <-- Agregar 'backend.'
from backend.repositories.prospecto_repository import ProspectoRepository # <-- Agregar 'backend.'
import httpx

router = APIRouter()

# 1. Endpoint que React llama para iniciar búsqueda
@router.post("/buscar")
async def buscar_empresas(keyword: str, ciudad: str):
    N8N_WEBHOOK_URL = "TU_URL_DE_N8N_AQUI" # Webhook de n8n
    
    async with httpx.AsyncClient() as client:
        # Disparamos n8n y no esperamos a que termine (n8n luego nos llamará de vuelta)
        await client.post(N8N_WEBHOOK_URL, json={
            "keyword": keyword,
            "city": ciudad
        })
    
    return {"status": "processing", "message": "Búsqueda iniciada en n8n"}

# 2. Endpoint que n8n llama para guardar los resultados
@router.post("/webhook-resultados")
async def recibir_resultados_n8n(data: ProspectoBulk, db: Session = Depends(get_db)):
    repo = ProspectoRepository(db)
    return repo.create_bulk(data.items)

# 3. Endpoint para que React muestre la tabla
@router.get("/prospectos")
async def listar_prospectos(db: Session = Depends(get_db)):
    repo = ProspectoRepository(db)
    return repo.get_all()