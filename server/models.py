from server.app import db

class Song(db.Model):

    __tablename__ = "songs"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    artist = db.Column(db.String, nullable=False)

    ratings = db.relationship("Rating", back_populates="song")



class Rating(db.Model):

    __tablename__ = "ratings"

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    song_id = db.Column(db.Integer, db.ForeignKey("songs.id"))

    song = db.relationship("Song", back_populates="ratings")
    
