import {useState, useEffect} from "react";

function SongDisplay() {
    const [songs, setsongs] = useState([])
    const [ratings, setratings] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {
        fetch("http://127.0.0.1:5000/songs")
        .then(response => response.json())
        .then(data => setsongs(data))
        .catch(error => setError(error.message))
    }, [])  
   

    return(
        <div>
            <h1>Songs And Ratings</h1>
            
                
                {songs.map((song) => <div key={song.id}>
                    <h2>{song.name} by {song.artist}</h2>
                    <iframe src={`https://open.spotify.com/embed/track/${song.url.split("/").pop()}`} width="300" height="80"></iframe>
                </div>)}:
            
        </div>
    )
}

export default SongDisplay;
    