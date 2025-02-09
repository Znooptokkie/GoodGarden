from app.extensions import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

class GenericPlantData(db.Model):

    __tablename__ = "generic_plant_data"

    id = db.Column(db.Integer, primary_key=True)
    common_name = db.Column(db.String(255), nullable=True)
    scientific_name = db.Column(db.String(255), nullable=True)
    other_name = db.Column(db.String(255), nullable=True)
    cycle = db.Column(db.String(255), nullable=True)
    watering = db.Column(db.String(255), nullable=True)
    sunlight = db.Column(db.JSON(), nullable=True)
    plant_id = db.Column(db.Integer, ForeignKey("plant.id"), nullable=False)

    plant = relationship("Plant", back_populates="generic")

    @classmethod
    def getGenericData(cls):
        pass

    @classmethod
    def setGenericData(cls, data):
        pass

    @classmethod
    def fetchGenericData(cls):
        pass