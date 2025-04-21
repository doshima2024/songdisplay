from server.app import db
from flask import jsonify
from sqlalchemy.orm import validates

class Song(db.Model):

    __tablename__ = "songs"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    artist = db.Column(db.String, nullable=False)
    url = db.Column(db.String, nullable=False)

    ratings = db.relationship("Rating", back_populates="song", cascade="all, delete")

    def __repr__(self): 
        return f'Song: {self.name} is by {self.artist}'
    
    def to_dict(self):
        return {"id": self.id, "name": self.name, "artist": self.artist, "url": self.url}
      
    @validates("name")
    def validate_name(self, key, value):
        if not type(value) == str:
            raise TypeError("song name must be a string")
        if not value.strip():
            raise ValueError("song name must not be empty")
        return value
    
    @validates("artist")
    def validate_artist(self, key, value):
        if not type(value) == str:
            raise TypeError("artist name must be a string")
        if not value.strip():
            raise ValueError("artist name must not be empty")
        return value
    
    @validates("url")
    def validate_url(self, key, value):
        if not type(value) == str:
            raise TypeError("URL must be a string")
        if not value.strip():
            raise ValueError("URL must not be empty")
        return value

class Rating(db.Model):

    __tablename__ = "ratings"

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    song_id = db.Column(db.Integer, db.ForeignKey("songs.id"), nullable=False)

    song = db.relationship("Song", back_populates="ratings")
    
    def __repr__(self):
        return f'Song with ID: {self.song_id} has a rating of {self.rating}'
    
    def to_dict(self):
        return {"id": self.id, "rating": self.rating, "song_id": self.song_id}
    
    @validates("rating")
    def validate_rating(self, key, value):
        if not type(value) == int:
            raise TypeError("Rating must be a number")
        if value <= 0 or value >= 10:
            raise ValueError("Rating must be between zero and ten")
        return value