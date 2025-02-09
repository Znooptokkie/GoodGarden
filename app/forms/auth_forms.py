from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, EmailField
from wtforms.validators import DataRequired, Email, Length, EqualTo
import bleach

class LoginForm(FlaskForm):
    username = StringField("Gebruikersnaam", validators=[DataRequired(), Length(min=4, max=25)], render_kw={"id": "username-login", "class": "first-input"})
    password = PasswordField("Wachtwoord", validators=[DataRequired()], render_kw={"id": "password-login"})
    submit = SubmitField("Inloggen")

    def sanitize_data(self):
        self.username.data = bleach.clean(self.username.data)
        self.password.data = bleach.clean(self.password.data)

class RegisterForm(FlaskForm):
    username = StringField("Gebruikersnaam", validators=[DataRequired(), Length(min=4, max=25)], render_kw={"id": "username-register", "class": "first-input"})
    email = EmailField("E-mailadres", validators=[DataRequired(), Email(), Length(max=100)], render_kw={"id": "email-register"})
    password = PasswordField("Wachtwoord", validators=[DataRequired(), Length(min=1)], render_kw={"id": "password-register"})
    confirm_password = PasswordField("Herhaal Wachtwoord", validators=[DataRequired(), EqualTo('password')], render_kw={"id": "confirm-password-register"})
    submit = SubmitField("Registreren")

    def sanitize_data(self):
        self.username.data = bleach.clean(self.username.data)
        self.email.data = bleach.clean(self.email.data)
        self.password.data = bleach.clean(self.password.data)
        self.confirm_password.data = bleach.clean(self.confirm_password.data)
