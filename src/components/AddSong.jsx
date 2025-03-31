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
    
}

// I'm going to need to write out methods and header sections before finishing my POST request call
//I'm going to need to write a form in JSX that uses onChange to set the state for name, artist and url
//I'm going to need to do somethinh (?) onSubmit for the form