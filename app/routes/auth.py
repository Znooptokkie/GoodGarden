from flask import Blueprint, redirect, url_for, flash
from app.forms.auth_forms import LoginForm, RegisterForm
from flask_login import logout_user, login_required
from app.models.user import User
from flask import request

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/login", methods=["POST"])
def login():

    login_form = LoginForm()

    if login_form.validate_on_submit():

        form_data = {
            "username": login_form.username.data,
            "password": login_form.password.data
        }
    
        success, message, category = User.inloggen(form_data)
    
        if success:
            flash(message, category)
            return redirect(url_for("main.index"))
        else:
            flash(message, category)
            return redirect(url_for("main.index"))
    
    flash("Inloggen mislukt!", "modal_faal")
    return redirect(url_for("main.index"))

@auth_bp.route("/register", methods=["POST"])
def register():

    register_form = RegisterForm()

    if register_form.validate_on_submit():

        # print("REGISTER@#@!#@#")

        register_form.sanitize_data()

        form_data = {
            "username": register_form.username.data,
            "email": register_form.email.data,
            "password": register_form.password.data,
        }

        success, message, category = User.registreren(form_data)

        if success:
            flash(message, category)
            return redirect(url_for("main.index"))
        else:
            flash(message, category)
            return redirect(url_for("main.index"))

    flash("Registratie mislukt!", "modal_faal")
    return redirect(url_for("main.index"))

@auth_bp.route("/logout", methods=["POST"])
@login_required
def logout():

    logout_user()
    flash("Je bent succesvol uitgelogd.", "success")
    return redirect(url_for("main.index"))
