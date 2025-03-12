from flask import Blueprint, render_template, flash, redirect, url_for
from app.forms.auth_forms import LoginForm, RegisterForm
from app.models.plant import Plant 
from app.forms.plant_forms import *

main_bp = Blueprint("main", __name__)

@main_bp.route("/")
def index():
    planten = Plant.getPlantVoorGrid()

    return render_template("main/index.html", planten=planten)

@main_bp.route("/plant/<int:plant_id>")
def plant(plant_id):

    plant = Plant.query.get_or_404(plant_id)

    return render_template("main/plant.html", plant=plant)

@main_bp.route("/plant/add", methods=["POST"])
def plantToevoegen():

    plant_toevoegen_form = PlantToevoegen()

    if plant_toevoegen_form.validate_on_submit():

        form_data = {
            "plant_naam": plant_toevoegen_form.plant_naam.data,
            "plant_soort": plant_toevoegen_form.plant_soort.data,
            "plant_geteelt": plant_toevoegen_form.plant_geteelt.data,
            "kas_locatie": plant_toevoegen_form.kas_locatie.data
        }

        succes, message, category = Plant.plantToevoegen()

        if succes:
            flash(message, category)
            return redirect(url_for("main.index"))
        else:
            flash(message, category)
            return redirect(url_for("main.index"))
        
    return redirect(url_for("main.index"))

