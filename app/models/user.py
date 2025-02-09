from app.extensions import db
from flask_login import UserMixin, login_user
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model, UserMixin):

    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.Enum("admin", "bezoeker"), default="bezoeker", nullable=False)
    date_created = db.Column(db.DateTime, default=db.func.current_timestamp())

    @classmethod
    def inloggen(cls, form):
        gebruiker = cls.query.filter_by(username=form["username"]).first()

        if not gebruiker:
            return False, "Geen geldige gegevens!", "modal_faal"
        
        if not check_password_hash(gebruiker.password, form["password"]):
            return False, "Onjuist wachtwoord of gebruikersnaam. Probeer het opnieuw.", "modal_faal"
        
        try:
            login_user(gebruiker)
            return True, "Succesvol ingelogd.", "modal_succes"
        
        except Exception as e:
            return False, f"Fout bij inloggen: {str(e)}", "danger-error"

    @classmethod
    def registreren(cls, data):
        bestaande_gebruikersnaam = cls.query.filter_by(username=data["username"]).first()
        bestaande_email = cls.query.filter_by(email=data["email"]).first()

        if bestaande_gebruikersnaam:
            return False, "Deze gebruikersnaam is al in gebruik!", "modal_faal"

        if bestaande_email:
            return False, "Dit e-mailadres is al in gebruik!", "modal_faal"

        data["password"] = generate_password_hash(data["password"])

        nieuwe_gebruiker = cls(**data)

        try:
            db.session.add(nieuwe_gebruiker)
            db.session.commit()
            return True, "Gebruiker succesvol geregistreerd.", "register_succes"
        
        except Exception as e:
            db.session.rollback()
            return False, f"Er is een fout opgetreden: {str(e)}", "danger"