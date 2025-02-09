# seed.py
from app import create_app
from app.extensions import db
from app.models.user import User
from app.models.plant import Plant
from werkzeug.security import generate_password_hash

def seed_admin():
    admin_exists = User.query.filter_by(email="admin@admin.nl").first()

    if admin_exists:
        print("Admin-user bestaat al, wordt niet opnieuw aangemaakt!")
        return

    admin = User(
        username="admin",
        email="admin@admin.nl",
        password=generate_password_hash("admin"),
        role="admin"
    )
    db.session.add(admin)
    db.session.commit()
    print("Admin-user aangemaakt!")

def seed_plant():
    planten = [
        {
            "plant_naam": "Tomaat",
            "plant_soort": "groente",
            "plant_geteelt": True,
            "kas_locatie": "LEFT",
        },
        {
            "plant_naam": "Koriander",
            "plant_soort": "kruiden",
            "plant_geteelt": True,
            "kas_locatie": "LEFT",
        },
        {
            "plant_naam": "Aardbei",
            "plant_soort": "fruit",
            "plant_geteelt": True,
            "kas_locatie": "RIGHT",
        },
        {
            "plant_naam": "Champignon",
            "plant_soort": "schimmel",
            "plant_geteelt": True,
            "kas_locatie": "RIGHT",
        },
        {
            "plant_naam": "Cactus",
            "plant_soort": "overig",
            "plant_geteelt": True,
            "kas_locatie": "LEFT",
        },
        {
            "plant_naam": "Peer",
            "plant_soort": "fruit",
            "plant_geteelt": False,
            "kas_locatie": "LEFT",
        },
    ]

    added_count = 0
    skipped_count = 0

    for plant_data in planten:
        existing_plant = Plant.query.filter_by(plant_naam=plant_data["plant_naam"]).first()
        
        if existing_plant:
            print(f"Plant '{plant_data['plant_naam']}' bestaat al, wordt overgeslagen.")
            skipped_count += 1
            continue

        new_plant = Plant(**plant_data)
        db.session.add(new_plant)
        added_count += 1

    if added_count > 0:
        db.session.commit()

    print(f"Planten seeding voltooid! Toegevoegd: {added_count}, Overgeslagen: {skipped_count}")

if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        seed_admin()
        seed_plant() 
