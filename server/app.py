from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate



app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///main.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False



db = SQLAlchemy(app)
migrate = Migrate(app, db)

def register_models():
    global Song, Rating
    from server.models import Song, Rating

register_models()

@app.get("/song")
def get_song():
    song = Song.query.first()
    return jsonify(song.to_dict())

@app.get("/rating")
def get_rating():
    rating = Rating.query.first()
    return jsonify(rating.to_dict())