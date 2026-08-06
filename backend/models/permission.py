from sqlalchemy import Column, String, DateTime, func, ForeignKey, Table
from sqlalchemy.orm import relationship
from backend.core.database import Base

role_permission_association = Table(
    'role_permissions',
    Base.metadata,
    Column('role_id', String, ForeignKey('roles.id', ondelete='CASCADE'), primary_key=True),
    Column('permission_id', String, ForeignKey('permisos.id', ondelete='CASCADE'), primary_key=True)
)

class Permission(Base):
    __tablename__ = "permisos"

    id = Column(String, primary_key=True, index=True)
    nombre = Column(String, unique=True, nullable=False, index=True)
    descripcion = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
