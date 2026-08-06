from sqlalchemy import Column, String, DateTime, func
from sqlalchemy.orm import relationship
from backend.core.database import Base
from backend.models.permission import role_permission_association

class Role(Base):
    __tablename__ = "roles"

    id = Column(String, primary_key=True, index=True)
    nombre = Column(String, unique=True, nullable=False, index=True)  # Administrador, Operador, Invitado
    descripcion = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    permissions = relationship("Permission", secondary=role_permission_association, backref="roles")
