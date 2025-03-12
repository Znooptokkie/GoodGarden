from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, EmailField, SelectField, BooleanField, RadioField
from wtforms.validators import DataRequired, Email, Length, EqualTo
import bleach

class PlantToevoegen(FlaskForm):
    plant_naam = StringField("Plant Toevoegen", validators=[DataRequired(), Length(max=100)], render_kw={"id": "plant-naam", "class": "first-input"})
    plant_soort = SelectField("Plantsoort", choices=[("schimmel", "Schimmel"),("kruiden", "Kruiden"),("groente", "Groente"),("fruit", "Fruit"),("overig", "Overig"),], validators=[DataRequired()], render_kw={"id": "plant-soorten"})
    plant_geteelt = BooleanField("Plant Geteelt", default=True, validators=[DataRequired()], render_kw={"id": "plant-geteelt"})
    kas_locatie = RadioField("Kas Locatie", choices=[("LEFT", "Links"),("RIGHT", "Recht")], validators=[DataRequired()], render_kw={"id": "plant-locatie"})
    submit = SubmitField("Toevoegen")

    def sanitize_data(self):
        self.plant_naam.data = bleach.clean(self.plant_naam.data)
