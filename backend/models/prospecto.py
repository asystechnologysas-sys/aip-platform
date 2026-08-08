from sqlalchemy import Column, String, Integer, Float, DateTime, Text
from backend.core.database import Base # <-- Agregar 'backend.'
from datetime import datetime

class Prospecto(Base):
    __tablename__ = "prospectos"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(255), nullable=False)
    telefono = Column(String(100))
    sitio_web = Column(String(255))
    direccion = Column(Text)
    rating = Column(Float, default=0.0)
    categoria = Column(String(100))
    ciudad = Column(String(100))
    pais = Column(String(100))
    # Campos para el Funnel
    estado = Column(String(50), default="descubierto") # descubierto, auditado, contactado
    created_at = Column(DateTime, default=datetime.utcnow)