from sqlalchemy.orm import Session
from models.prospecto import Prospecto
from schemas.prospecto import ProspectoCreate
from typing import List

class ProspectoRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_bulk(self, prospectos: List[ProspectoCreate]):
        for data in prospectos:
            # Evitar duplicados por nombre y teléfono
            existente = self.db.query(Prospecto).filter(
                Prospecto.nombre == data.nombre,
                Prospecto.telefono == data.telefono
            ).first()
            
            if not existente:
                db_prospecto = Prospecto(**data.model_dump())
                self.db.add(db_prospecto)
        
        self.db.commit()
        return {"status": "success", "message": "Prospectos guardados"}

    def get_all(self):
        return self.db.query(Prospecto).order_by(Prospecto.created_at.desc()).all()