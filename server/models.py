from server.app import db

class Song(db.Model):

    __tablename__ = "songs"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    artist = db.Column(db.String, nullable=False)

class Rating(db.Model):

    __tablename__ = "ratings"

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer)
    song_id = db.Column(db.Integer, db.ForeignKey("songs.id"))

 
    #test models before moving on
