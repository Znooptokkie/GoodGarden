from app.extensions import db
from sqlalchemy.orm import relationship

class Plant(db.Model):

    __tablename__ = "plant"

    id = db.Column(db.Integer, primary_key=True)
    plant_naam = db.Column(db.String(50), unique=True, nullable=False)
    plant_soort = db.Column(db.Enum("schimmel", "kruiden", "groente", "fruit", "overig"), default="overig", nullable=False)
    plant_geteelt = db.Column(db.Boolean(), default=False, nullable=False)
    kas_locatie = db.Column(db.Enum("LEFT", "RIGHT"), nullable=False, default="LEFT")

    generic = relationship("GenericPlantData", back_populates="plant", cascade="all, delete-orphan")
    specific = relationship("SpecificPlantData", back_populates="plant", cascade="all, delete-orphan")
    oogst = relationship("Oogst", back_populates="plant", cascade="all, delete-orphan")

    @classmethod
    def plantToevoegen(cls, form):
        pass