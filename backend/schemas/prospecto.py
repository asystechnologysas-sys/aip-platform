from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class ProspectoBase(BaseModel):
    nombre: str
    telefono: Optional[str] = None
    sitio_web: Optional[str] = None
    direccion: Optional[str] = None
    rating: Optional[float] = 0.0
    categoria: Optional[str] = None
    ciudad: Optional[str] = None
    pais: Optional[str] = None

class ProspectoCreate(ProspectoBase):
    pass

class ProspectoSchema(ProspectoBase):
    id: int
    estado: str
    created_at: datetime

    class Config:
        from_attributes = True

# Para recibir la lista desde n8n
class ProspectoBulk(BaseModel):
    items: List[ProspectoCreate]