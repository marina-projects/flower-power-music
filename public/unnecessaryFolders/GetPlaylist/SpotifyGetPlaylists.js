import React, { useState, useEffect } from "react";
import axios from  'axios';

const PLAYLISTS_ENDPOINT = 'https://api.spotify.com/v1/playlists';

function SpotifyGetPlaylists () {

    const [token, setToken] = useState('');
    const [data, setData] = useState({});

    useEffect(() => {
        if(localStorage.getItem('accessToken')) {
            setToken(localStorage.getItem('accessToken'))
        }
    }, []);

    const handleGetPlaylist = () => {
        axios
        .get(PLAYLISTS_ENDPOINT, {
            headers: {
                Authorization: "Bearer " + token,
            }
        })
        .then ((response) => {
            setData(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
        
    };

    return (
        <button onClick={handleGetPlaylist}>Get Playlist</button>
    )
}

export default SpotifyGetPlaylists;