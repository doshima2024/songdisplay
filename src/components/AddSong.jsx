import React, {useState} from "react"

function AddSong({setSongs}) {

    const [name, setName] = useState("")
    const [artist, setArtist] = useState("")
    const [url, setUrl] = useState("")

    const handleSubmit = (event) => {

    event.preventDefault();


    fetch("http://127.0.0.1:5000/song", {
     method: "POST",
     headers: {"Content-Type": "application/json",
     "Accept": "application/json"
    },
    body: JSON.stringify(
       { "name": name,
        "artist": artist,
        "url": url}
    )})
    .then(response => response.json())
    .then(data => {
        setSongs(prevSongs => [...prevSongs, data])
        setName("");
        setArtist("");
        setUrl("");
    
    })

}

return(
    <div>
        <h3 className="text-2xl">Add A Song To The List:</h3>
        <form onSubmit= {handleSubmit} className="bg-white rounded-xl p-6 shadow-md space-y-4">
            <label id="name">Song Name:</label>
            <input type="text" placeholder="Song Name" className="bg-white p-2 border border-gray-300 rounded w-full" value={name} onChange= {(event) => setName(event.target.value)}></input>
            <br></br>
            <label id="artist">Artist's Name:</label>
            <input type="text" placeholder = "Artist Name" className="bg-white p-2 border border-gray-300 rounded w-full" value={artist} onChange= {(event) => setArtist(event.target.value)}></input>
            <br></br>
            <label id="url">Spotify URL:</label>
            <input type="text" placeholder="Spotfiy URL" className="bg-white p-2 border border-gray-300 rounded w-full" value={url} onChange= {(event) => setUrl(event.target.value)}></input>
            <br></br>
            <button type="submit">Add Song</button>
        </form>
    </div>

)
    
}

// I'm going to need to write out methods and header sections before finishing my POST request call
//I'm going to need to write a form in JSX that uses onChange to set the state for name, artist and url
//I'm going to need to do somethinh (?) onSubmit for the form

export default AddSong;