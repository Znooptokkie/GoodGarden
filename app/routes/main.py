from flask import Blueprint, render_template
from app.forms.auth_forms import LoginForm, RegisterForm

main_bp = Blueprint("main", __name__)

@main_bp.route("/")
def index():
    login_form = LoginForm()
    register_form = RegisterForm()

    return render_template("main/index.html", login_form=login_form, register_form=register_form)
