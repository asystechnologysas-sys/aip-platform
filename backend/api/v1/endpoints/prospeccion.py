from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.core.database import get_db # <-- Agregar 'backend.'
from backend.schemas.prospecto import ProspectoBulk # <-- Agregar 'backend.'
from backend.repositories.prospecto_repository import ProspectoRepository # <-- Agregar 'backend.'
import httpx
from pydantic import BaseModel

class SearchSchema(BaseModel):
    keyword: str
    ciudad: str

router = APIRouter()
# En listar_prospectos
@router.get("/prospectos")
async def listar_prospectos(db: Session = Depends(get_db)):
    repo = ProspectoRepository(db)
    return await repo.get_all() # <-- ASEGÚRATE DE QUE TENGA EL 'await'

# 1. Endpoint que React llama para iniciar búsqueda
@router.post("/buscar")
async def buscar_empresas(data: SearchSchema): # <--- Ahora recibe 'data' como SearchSchema
    # Esta es la URL de tu n8n (asegúrate de que sea la de Production)
    N8N_WEBHOOK_URL = "https://n8n-cv-n8n.xn53ak.easypanel.host/webhook/buscar-empresas"
    
    async with httpx.AsyncClient() as client:
        await client.post(N8N_WEBHOOK_URL, json={
            "keyword": data.keyword,
            "city": data.ciudad
        })
    
    return {"status": "processing", "message": f"Buscando {data.keyword} en {data.ciudad}"}

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