import React, { useState, useEffect } from "react";
import axios from "axios";

const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/playlists/2F4zH00XCKtHV7eMG2E3Qq";

const SpotifyGetPlaylists = () => {

    const [token, setToken] = useState('');
    const [data, setData] = useState({});
    // const [dataArray, setDataArray] = useState([]);

    useEffect(() => {
        if(localStorage.getItem('accessToken')) {
            setToken(localStorage.getItem('accessToken'));
        }
    }, []);

    const handleGetPlaylists = () => {
        axios
          .get(PLAYLISTS_ENDPOINT, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((response) => {
            setData(response.data);
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
      };

    // setDataArray(data.tracks.items);

    return (
        <div>
            <button onClick={handleGetPlaylists}>Get Playlist</button>
            <p>{data.name}</p>
                <ul>
                    {data.tracks.items.map((item) => (
                        <li key={item.track.id}>{item.track.name}</li>
                    ))}
                </ul>
        </div>
    )
       
}

export default SpotifyGetPlaylists;