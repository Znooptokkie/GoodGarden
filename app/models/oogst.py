from app.extensions import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey

class Oogst(db.Model):

    __tablename__ = "oogst"

    id = db.Column(db.Integer, primary_key=True)
    datum = db.Column(db.DateTime, default=db.func.current_timestamp())
    succesvol = db.Column(db.Boolean(), nullable=True)
    plant_id = db.Column(db.Integer, ForeignKey("plant.id"), nullable=False)

    plant = relationship("Plant", back_populates="oogst")

    @classmethod
    def plantToevoegen(cls, form):
        pass