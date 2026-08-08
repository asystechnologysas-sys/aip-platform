from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from backend.models.prospecto import Prospecto
from backend.schemas.prospecto import ProspectoCreate
from typing import List

class ProspectoRepository:
    def __init__(self, db: AsyncSession): # Cambiado a AsyncSession
        self.db = db

    async def create_bulk(self, prospectos: List[ProspectoCreate]):
        for data in prospectos:
            # Forma asíncrona de buscar duplicados
            query = select(Prospecto).where(
                Prospecto.nombre == data.nombre,
                Prospecto.telefono == data.telefono
            )
            result = await self.db.execute(query)
            existente = result.scalar_one_or_none()
            
            if not existente:
                db_prospecto = Prospecto(**data.model_dump())
                self.db.add(db_prospecto)
        
        await self.db.commit() # Usar await
        return {"status": "success", "message": "Prospectos guardados"}

    async def get_all(self):
        # Forma asíncrona de pedir todos los registros
        query = select(Prospecto).order_by(Prospecto.created_at.desc())
        result = await self.db.execute(query)
        return result.scalars().all() # Esto devuelve la lista de prospectos