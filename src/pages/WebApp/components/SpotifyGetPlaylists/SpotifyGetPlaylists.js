import React, { useState, useEffect } from "react";
import axios from "axios";
import './Spotify.css'

const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/playlists/2F4zH00XCKtHV7eMG2E3Qq/tracks";

const SpotifyGetPlaylists = () => {

    const [token, setToken] = useState('');
    const [data, setData] = useState({});
    const [dataArray, setDataArray] = useState([]);

    useEffect(() => {
        if(localStorage.getItem('accessToken')) {
            setToken(localStorage.getItem('accessToken'));
        }
    }, []);

    useEffect(() => {
        console.log(dataArray);
    }, [dataArray]);

    const handleGetPlaylists = async () => {
        await axios
          .get(PLAYLISTS_ENDPOINT, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((response) => {
            setData(response.data);
            const playlistItems = response.data.items;
            setDataArray(playlistItems);
            console.log(dataArray)
          })
          .catch((error) => {
            console.log(error);
          });
      };

    return (
        <div className="get-playlist">
            <button onClick={handleGetPlaylists}>Get Playlist</button>
            <p>{data.name}</p>
            <p>{data.id}</p>
            <ul>
                {dataArray.map((i) => (
                    <li key={i.track.id}>{i.track.name}, {i.track.artists[0].name}, {i.track.external_urls.spotify}</li>
                ))}
            </ul>
        </div>
    )
       
}

export default SpotifyGetPlaylists;