import {useState, useEffect} from "react";

function SongDisplay() {
    const [songs, setSongs] = useState([])
    const [ratings, setRatings] = useState([])
    const [error, setError] = useState("")

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
   

    return(
        <div>
            <h1>Songs And Ratings</h1>
                {error && <p>Error: {error}</p>}
                
                {songs.map((song) => <div key={song.id}>
                    <h2>{song.name} by {song.artist}</h2>
                    <iframe src={`https://open.spotify.com/embed/track/${song.url.split("/").pop()}`} width="300" height="80"></iframe>
                </div>)}
            
        </div>
    )
}

export default SongDisplay;
    