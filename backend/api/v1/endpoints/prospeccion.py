from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from backend.core.database import get_db
from backend.schemas.prospecto import ProspectoBulk
from backend.repositories.prospecto_repository import ProspectoRepository
import httpx
from pydantic import BaseModel

# Esquema para la búsqueda
class SearchSchema(BaseModel):
    keyword: str
    ciudad: str

router = APIRouter()

# 1. Endpoint para ver la tabla en React (Solo uno, con await)
@router.get("/prospectos")
async def listar_prospectos(db: AsyncSession = Depends(get_db)):
    repo = ProspectoRepository(db)
    return await repo.get_all()

# 2. Endpoint que React llama para iniciar búsqueda
@router.post("/buscar")
async def buscar_empresas(data: SearchSchema):
    # Asegúrate de que esta sea la Production URL de n8n
    N8N_WEBHOOK_URL = "https://n8n-cv-n8n.xn53ak.easypanel.host/webhook-test/buscar-empresas"
    
    
    async with httpx.AsyncClient() as client:
        try:
            # Enviamos 'keyword' y 'city' a n8n
            await client.post(N8N_WEBHOOK_URL, json={
                "keyword": data.keyword,
                "city": data.ciudad
            })
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error con n8n: {str(e)}")
    
    return {"status": "processing", "message": f"Buscando {data.keyword} en {data.ciudad}"}

# 3. Endpoint que n8n llama para guardar los resultados
@router.post("/webhook-resultados")
async def recibir_resultados_n8n(data: ProspectoBulk, db: AsyncSession = Depends(get_db)):
    repo = ProspectoRepository(db)
    return await repo.create_bulk(data.items)