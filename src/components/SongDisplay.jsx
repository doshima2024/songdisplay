import {useState, useEffect} from "react";
import AddSong from "./AddSong"

function SongDisplay() {
    const [songs, setSongs] = useState([])
    const [ratings, setRatings] = useState([])
    const [error, setError] = useState("")
    const [newRating, setNewRating] = useState({}) 

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

    const ratingValue = newRating[id];

    if (!ratingValue || ratingValue < 1 || ratingValue > 10) {
        alert("Please enter a rating between 1 and 10");
        return;
    }

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
        <div  className="rounded bg-gray-300 text-gray-700 max-w-5xl p-50"> 
        <div className="space-y-10">
            <h1 className="text-3xl font-bold text-center mb-6">Songs And Ratings</h1>

                {error && <p className="text-red-500 font-semibold text-center">Error: {error}</p>}
                
                {songs.map((song) => {
                    const songRatings = ratings.filter(rating => rating.song_id === song.id)
                return(
                    <div key={song.id} className="bg-gray-200 rounded-lg p-4 shadow-sm space-y-4">
                    <h2 className="text-xl font-semibold">{song.name} by {song.artist}</h2>
                    <iframe src={`https://open.spotify.com/embed/track/${song.url.split("/").pop()}`} width="300" height="80" className="mx-auto w-full"></iframe>
                    <br></br>
                    <button onClick={() => handleDelete(song.id)} className= "px-4 py-2 rounded shadow-md">Delete Song</button>
                    {songRatings.map((rating) =>
                    <p key={rating.id}>Song Rating: {rating.rating}</p>)}
                    <form onSubmit={(event) => handlePostRating(event, song.id)}>
                        <label className="text-xl block w-fit mx-auto mb-2">Leave A Rating:</label>
                        <input type="text" className="bg-white p-2 border border-gray-300 rounded w-full mb-2" value={newRating[song.id] || ""} onChange={(event) => setNewRating({...newRating, [song.id]: parseInt(event.target.value)})}></input>
                        <br></br>
                        <button type="submit" className="px-4 py-2 rounded shadow-md">Submit Rating</button>
                    </form>
                </div>)
            })}
            <AddSong setSongs={setSongs} />
        </div>
        </div>
    )
}

export default SongDisplay;
    