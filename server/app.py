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
    if songs:
        return jsonify([song.to_dict() for song in songs])
    else:
        return jsonify({"error": "no songs found in database"})

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
    
# Update a song in Database

#We want to take the id of the song to updated, get the user's input for the song change, get the 
#song to be updated, and then update it (?)

@app.patch("/songs/<int:id>")
def update_song(id):
    data = request.json
    song = Song.query.get(id)
    for key in data:
        #setattr(instance you want to update, attribute to be updated, new value)
        setattr(song, key, data[key])
    db.session.commit()
    return jsonify(song.to_dict())

@app.get("/ratings")
def get_ratings():
    ratings = Rating.query.all()
    if ratings:
        return jsonify([rating.to_dict() for rating in ratings])
    else:
        return jsonify({"error": "no ratings found in database"})
    
@app.post("/ratings/<int:song_id>")
def create_a_rating(song_id):
    data = request.json
    try:
        new_rating = Rating(rating=data["rating"], song_id=song_id)
        db.session.add(new_rating)
        db.session.commit()
        return jsonify(new_rating.to_dict())
    except Exception as exception:
        return jsonify({"error": str(exception)})

@app.delete("/ratings/<int:id>")
def delete_rating(id):
    rating = Rating.query.get(id)
    if rating:
        try:
            db.session.delete(rating)
            db.session.commit()
            return ({})
        except:
            return jsonify({"error": "error deleting rating"})
    else:
        return jsonify({"error": "no rating found with that id"})
    
@app.patch("/ratings/<int:id>")
def update_a_rating(id):
    existing_rating = Rating.query.get(id)
    if id:
        try:
            data = request.json
            for key in data:
                setattr(existing_rating, key, data[key])
                db.session.commit()
                return jsonify(existing_rating.to_dict())
        except: 
            return jsonify({"error": "no rating with that ID in the database"})
    
    

    
