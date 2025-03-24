from flask import Flask, jsonify, request
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

#Get and return all songs from the backend

@app.get("/songs")
def get_songs():
    songs = Song.query.all()
    return jsonify([song.to_dict() for song in songs])

#Add a new song to the database (add more robust error handling, status codes)

@app.post("/song")
def add_song():
    data = request.json
    try:
        new_song = (Song(name=data["name"], artist=data["artist"], url=data["url"]))
        #Could write with dictionary unpacking as: new_song = Song(**data)
        db.session.add(new_song)
        db.session.commit()
        return jsonify(new_song.to_dict())
    except Exception as exception:
        return jsonify(str(exception))
    
# Delete a song from the database by ID (add more robust error handling, status codes)

@app.delete("/songs/<int:id>")
def delete_song(id):
    song = Song.query.get(id)
    try:
        db.session.delete(song)
        db.session.commit()
        return jsonify({})
    except Exception as exception:
        return jsonify(str(exception))