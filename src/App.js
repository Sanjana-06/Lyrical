import './App.css';
import Axios from 'axios';
import { useState } from 'react';

function App() {
    const [artist, setArtist] = useState("");
    const [song, setSong] = useState("");
    const [lyrics, setLyrics] = useState("");
    const [error, setError] = useState(""); // New state for error messages

    // List of top 5 suggested artists
    const suggestedArtists = ["Taylor Swift", "Ed Sheeran", "Adele", "Drake", "Beyoncé"];

    function searchLyrics() {
        if (artist === "" || song === "") {
            setError("Please enter both artist and song name.");
            return;
        }
        Axios.get(`https://api.lyrics.ovh/v1/${artist}/${song}`)
            .then(res => {
                if (res.data.lyrics) {
                    setLyrics(res.data.lyrics);
                    setError(""); // Clear any previous error
                } else {
                    setLyrics("");
                    setError("Lyrics not found. Please check the artist and song name.");
                }
            })
            .catch(err => {
                setLyrics("");
                setError("Invalid request. Please check the artist and song name.");
            });
    }

    return (
        <div className="App">
            <h1>Lyrical</h1>

            <div className="suggestions">
                {suggestedArtists.map((suggestedArtist, index) => (
                    <button key={index} 
                            className="suggestion-btn" 
                            onClick={() => setArtist(suggestedArtist)}>
                        {suggestedArtist}
                    </button>
                ))}
            </div>

            <input className="inp" type="text" 
                placeholder='Artist name- Eg: Charlie Puth'
                value={artist}
                onChange={(e) => { setArtist(e.target.value) }} />

            <input className="inp" type="text" 
                placeholder='Song name- Eg: Switch Light'
                onChange={(e) => { setSong(e.target.value) }} />

            <button className="btn" 
                onClick={() => searchLyrics()}>
                     Search
            </button>

            <hr />
            {error && <div className="error-message">{error}</div>}
            <pre>{lyrics}</pre>
        </div>
    );
}

export default App;
