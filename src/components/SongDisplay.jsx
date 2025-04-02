import {useState, useEffect} from "react";
import AddSong from "./AddSong"

function SongDisplay() {
    const [songs, setSongs] = useState([])
    const [ratings, setRatings] = useState([])
    const [error, setError] = useState("")
    const [newRating, setNewRating] = useState({}) //new line here

    useEffect(() => {
        fetch("http://127.0.0.1:5000/songs")
        .then(response => response.json())
        .then(data => setSongs(data))
        .catch(error => setError(error.message))
    }, [])  

   useEffect(() => {
        fetch("http://127.0.0.1:5000/ratings")
        .then (response => response.json())
        .then (data => setRatings(data))
        .catch (error => setError(error.message))
   }, [])
   
   function handleDelete(id) {
    fetch(`http://127.0.0.1:5000/songs/${id}`, {"method": "DELETE"})
    .then(response => response.ok && setSongs(songs.filter(song => song.id !== id)))
    .catch(error => setError(error.message))
   }

   //new function below for handling the POST of a new rating and tying it to song ID:

   function handlePostRating(event, id) {
    
    event.preventDefault();

    fetch(`http://127.0.0.1:5000/ratings/${id}`, {"method": "POST",
        headers: {"Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "rating": newRating[id]
        })})
        .then(response => response.json())
        .then(data => {setRatings(prevRatings => [...prevRatings, data])
            setNewRating("")
        })
        .catch(error => setError(error.message))
   }

    return(
        <div>
            <h1>Songs And Ratings</h1>

                {error && <p>Error: {error}</p>}
                
                {songs.map((song) => {
                    const songRatings = ratings.filter(rating => rating.song_id === song.id)
                return(
                    <div key={song.id}>
                    <h2>{song.name} by {song.artist}</h2>
                    <iframe src={`https://open.spotify.com/embed/track/${song.url.split("/").pop()}`} width="300" height="80"></iframe>
                    <br></br>
                    <button onClick={() => handleDelete(song.id)}>Delete Song</button>
                    {songRatings.map((rating) =>
                    <p key={rating.id}>Song Rating: {rating.rating}</p>)}
                    <form onSubmit={(event) => handlePostRating(event, song.id)}>
                        <label>Leave A Rating:</label>
                        <input type="text" value={newRating[song.id] || ""} onChange={(event) => setNewRating({...newRating, [song.id]:event.target.value})}></input>
                        <button type="submit">Submit Rating</button>
                    </form>
                </div>)
            })}
            <AddSong setSongs={setSongs} />
        </div>
    )
}

export default SongDisplay;
    