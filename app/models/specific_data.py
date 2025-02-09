from app.extensions import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

class SpecificPlantData(db.Model):
    __tablename__ = "specific_plant_data"

    specific_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    family = db.Column(db.String(255), nullable=True)
    origin = db.Column(db.JSON, nullable=True)
    type = db.Column(db.String(255), nullable=True)
    dimension = db.Column(db.String(255), nullable=True)
    dimensions = db.Column(db.JSON, nullable=True)
    cycle = db.Column(db.String(255), nullable=True)
    attracts = db.Column(db.JSON, nullable=True)
    propagation = db.Column(db.JSON, nullable=True)
    hardiness = db.Column(db.JSON, nullable=True)
    watering = db.Column(db.String(255), nullable=True)
    depth_water_requirement = db.Column(db.JSON, nullable=True)
    volume_water_requirement = db.Column(db.JSON, nullable=True)
    watering_general_benchmark = db.Column(db.JSON, nullable=True)
    plant_anatomy = db.Column(db.JSON, nullable=True)
    sunlight = db.Column(db.JSON, nullable=True)
    pruning_month = db.Column(db.JSON, nullable=True)
    pruning_count = db.Column(db.JSON, nullable=True)
    seeds = db.Column(db.Integer, nullable=True)
    maintenance = db.Column(db.String(255), nullable=True)
    care_guides = db.Column(db.String(255), nullable=True)
    soil = db.Column(db.JSON, nullable=True)
    growth_rate = db.Column(db.String(255), nullable=True)
    drought_tolerant = db.Column(db.Boolean, default=False)
    salt_tolerant = db.Column(db.Boolean, default=False)
    thorny = db.Column(db.Boolean, default=False)
    invasive = db.Column(db.Boolean, default=False)
    tropical = db.Column(db.Boolean, default=False)
    indoor = db.Column(db.Boolean, default=False)
    care_level = db.Column(db.String(255), nullable=True)
    pest_susceptibility = db.Column(db.JSON, nullable=True)
    pest_susceptibility_api = db.Column(db.String(255), nullable=True)
    flowers = db.Column(db.Boolean, default=False)
    flowering_season = db.Column(db.String(255), nullable=True)
    flower_color = db.Column(db.String(255), nullable=True)
    cones = db.Column(db.Boolean, default=False)
    fruits = db.Column(db.Boolean, default=False)
    edible_fruit = db.Column(db.Boolean, default=False)
    edible_fruit_taste_profile = db.Column(db.String(255), nullable=True)
    fruit_nutritional_value = db.Column(db.String(255), nullable=True)
    fruit_color = db.Column(db.JSON, nullable=True)
    harvest_season = db.Column(db.String(255), nullable=True)
    leaf = db.Column(db.Boolean, default=False)
    leaf_color = db.Column(db.JSON, nullable=True)
    edible_leaf = db.Column(db.Boolean, default=False)
    cuisine = db.Column(db.Boolean, default=False)
    medicinal = db.Column(db.Boolean, default=False)
    poisonous_to_humans = db.Column(db.Boolean, default=False)
    poisonous_to_pets = db.Column(db.Boolean, default=False)
    description = db.Column(db.Text, nullable=True)
    default_image = db.Column(db.JSON, nullable=True)
    plant_id = db.Column(db.Integer, ForeignKey("plant.id"), nullable=False)

    plant = relationship("Plant", back_populates="specific")