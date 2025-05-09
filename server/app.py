from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
import os


app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL", "postgresql://apple:apple@localhost:5432/songdisplaydb")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False



db = SQLAlchemy(app)
migrate = Migrate(app, db)

def register_models():
    global Song, Rating
    from server.models import Song, Rating

register_models()

def handle_error(error):
    return jsonify({"error": str(error)}), 500

#Get and return all songs from the backend

@app.get("/songs")
def get_songs():
    songs = Song.query.all()
    if songs:
        return jsonify([song.to_dict() for song in songs]), 200 
    else:
        return jsonify({"error": "no songs found in database"}), 404

#Add a new song to the database (add more robust error handling, status codes)

@app.post("/song")
def add_song():
    #converting (parsing) the JSON object sent by the frontend HTTP request into a Python dictionary:
    data = request.json
    try:
        new_song = (Song(name=data["name"], artist=data["artist"], url=data["url"]))
        #Could write with dictionary unpacking as: new_song = Song(**data)
        db.session.add(new_song)
        db.session.commit()
        return jsonify(new_song.to_dict()), 201
    except Exception as exception:
        return handle_error(exception)
    
# Delete a song from the database by ID (add more robust error handling, status codes)

@app.delete("/songs/<int:id>")
def delete_song(id):
    song = Song.query.get(id)
    if not song:
        return jsonify({"error": "song with that ID not found in database"}), 404
    try:
        db.session.delete(song)
        db.session.commit()
        return jsonify({}), 204
    except Exception as exception:
        return handle_error(exception)
    
# Update a song in Database

#We want to take the id of the song to updated, get the user's input for the song change, get the 
#song to be updated, and then update it (?)

@app.patch("/songs/<int:id>")
def update_song(id):
    data = request.json
    song = Song.query.get(id)
    if not song:
        return jsonify({"error": "no song with that ID found in the database"}), 404
    try:
        for key in data:
        #setattr(instance you want to update, attribute to be updated, new value)
            setattr(song, key, data[key])
        db.session.commit()
        return jsonify(song.to_dict()), 200
    except Exception as exception:
        return handle_error(exception)

@app.get("/ratings")
def get_ratings():
    ratings = Rating.query.all()
    return jsonify([rating.to_dict() for rating in ratings]), 200
    
    
@app.post("/ratings/<int:song_id>")
def create_a_rating(song_id):
    data = request.json
    try:
        rating_value = int(data["rating"])
        new_rating = Rating(rating=rating_value, song_id=song_id)
        db.session.add(new_rating)
        db.session.commit()
        return jsonify(new_rating.to_dict()), 201
    except Exception as exception:
        return handle_error(exception)

@app.delete("/ratings/<int:id>")
def delete_rating(id):
    rating = Rating.query.get(id)
    if rating:
        try:
            db.session.delete(rating)
            db.session.commit()
            return ({}), 204
        except Exception as exception:
            return handle_error(exception)
    else:
        return jsonify({"error": "no rating found with that id"}), 404
    
@app.patch("/ratings/<int:id>")
def update_a_rating(id):
    existing_rating = Rating.query.get(id)
    if existing_rating is None:
        return jsonify({"error": "No rating found with that ID"}), 404
    try:
        data = request.json
        for key in data:
            setattr(existing_rating, key, data[key])
        db.session.commit()
        return jsonify(existing_rating.to_dict()), 200
    except Exception as exception: 
        return handle_error(exception)
    
if __name__ == "__main__":
    app.run(debug=True)
    
