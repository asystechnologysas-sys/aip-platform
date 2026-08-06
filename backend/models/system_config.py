from sqlalchemy import Column, String, DateTime, func, JSON
from backend.core.database import Base

class SystemConfig(Base):
    __tablename__ = "configuracion"

    clave = Column(String, primary_key=True, index=True)
    valor = Column(JSON, nullable=False)
    descripcion = Column(String, nullable=True)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
