from flask import url_for
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
    def getPlantVoorGrid(cls):
        plant_soort_afbeelding_aanwezig = {
            "groente": "/static/images/icons_category/carrot.png",
            "overig": "/static/images/icons_category/leaf.png",
            "schimmel": "/static/images/icons_category/mushroom.png",
            "kruiden": "/static/images/icons_category/salt.png",
            "fruit": "/static/images/icons_category/strawberry.png",
        }

        planten = cls.query.all()

        planten_data = [
            {
                "id": plant.id,
                "plant_naam": plant.plant_naam,
                "plant_soort": plant.plant_soort,
                "plant_geteelt": plant.plant_geteelt,
                "kas_locatie": plant.kas_locatie,
                "afbeelding": plant_soort_afbeelding_aanwezig.get(plant.plant_soort, "/static/images/icons_category/default.png"),
            }
            for plant in planten
        ]

        return cls.checkKant(planten_data)
    
    @classmethod
    def checkKant(cls, planten):

        planten_links = [plant for plant in planten if plant["kas_locatie"] == "LEFT"]
        planten_rechts = [plant for plant in planten if plant["kas_locatie"] == "RIGHT"]

        planten_gescheiden = [planten_links, planten_rechts]

        return cls.checkLimietGridKant(planten_gescheiden)

    @classmethod
    def checkLimietGridKant(cls, planten):

        add_icon = "/static/images/icons_category/plus.png"

        for planten_list in planten:
            add_grid_item = {
                "id": -2,
                "plant_naam": "",
                "plant_soort": "placeholder",
                "plant_geteelt": False,
                "kas_locatie": planten_list[0]["kas_locatie"] if planten_list else "LEFT",
                "afbeelding": add_icon
            }
            planten_list.append(add_grid_item)

            while len(planten_list) < 8:
                planten_list.append({
                    "id": 0,   
                    "plant_naam": "",
                    "plant_soort": "placeholder",
                    "plant_geteelt": False,
                    "kas_locatie": planten_list[0]["kas_locatie"] if planten_list else "RIGHT",
                    "afbeelding": ""
                })

        return planten

