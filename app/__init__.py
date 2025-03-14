from flask import Flask
from app.config.config import Config
from app.extensions import db, migrate, login_manager
from app.models.user import User
from app.models.plant import Plant
from app.models.generic_data import GenericPlantData
from app.models.specific_data import SpecificPlantData
from app.models.oogst import Oogst
from app.forms.auth_forms import *
from app.forms.plant_forms import *

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    login_manager.init_app(app)

    from app.routes.auth import auth_bp
    from app.routes.main import main_bp
    app.register_blueprint(auth_bp)
    app.register_blueprint(main_bp)

    @app.context_processor
    def inject_forms():
        return {
            "login_form": LoginForm(),
            "register_form": RegisterForm(),
            "plant_toevoegen_form": PlantToevoegen(),
        }


    return app