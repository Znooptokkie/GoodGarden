import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "fallback_secret")
    SQLALCHEMY_DATABASE_URI = (
        f"mysql+pymysql://{os.getenv('DATABASE_USER')}:{os.getenv('DATABASE_PASSWORD')}"
        f"@{os.getenv('DATABASE_HOST', 'localhost')}/{os.getenv('DATABASE_NAME')}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
