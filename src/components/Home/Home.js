import React, { useState, useCallback, useEffect } from "react";
import SearchBar from "../SearchBar/searchBar";
import SearchResults from "../SearchResults/searchResults";
import AddPlaylist from "../AddPlaylist/addPlaylist";
import './Home.css';
import axios from "axios";

const HomeContent = (props) => {
  const [playlist, setPlaylist] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTitle, setPlaylistTitle] = useState('New playlist');
  const [playlistAreaDisplay, setPlaylistAreaDisplay] = useState('none');
  const [buttonTitle, setButtonTitle] = useState('Get a random 30 songs!');
  const [sidebarDisplay, setSidebarDisplay] = useState('none');

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      // Используйте props.token напрямую, без вызова setToken
      console.log("Token:", props.token);
    }
  }, [props.token]);

  const playlistDisplay = () => {
    props.handleGetPlaylists();
    setPlaylistAreaDisplay('flex');
    setSearchResults(props.resultArray);
    setButtonTitle('Show another songs');
  }

  const addTrack = useCallback(
    (track) => {
      setSidebarDisplay('flex');
      if (playlist.some((savedTrack) => savedTrack.track.id === track.track.id))
        return;
      setPlaylist((prevTracks) => [...prevTracks, track]);
    },
    [playlist]
  );

  const removeTrack = useCallback((track) => {
    setPlaylist((prevTracks) =>
      prevTracks.filter((currentTrack) => currentTrack.track.id !== track.track.id)
    );
  }, []
  );

  const inputPlaylistTitle = (event) => {
    setPlaylistTitle(event.target.value);
  }

  const createPlaylist = async () => {
    try {
      console.log('Token before request:', props.token);
  
      const response = await axios.post(
        `https://api.spotify.com/v1/me/playlists`,
        {
          name: playlistTitle,
          public: false,
        },
        {
          headers: {
            Authorization: 'Bearer ' + props.token,
            'Content-Type': 'application/json',
          },
        }
      );

      const playlistId = response.data.id;

      await axios.post(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          uris: playlist.map((track) => track.track.uri),
        },
        {
          headers: {
            Authorization: 'Bearer ' + props.token,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Playlist created and tracks added successfully!');
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  const sendPlaylistToSpotify = () => {
    createPlaylist();
  };

  return (
    <div className="home-content">
      <SearchBar onGetPlaylist={playlistDisplay} buttonTitle={buttonTitle} handleGetPlaylists={props.handleGetPlaylists} />
      <div className='playlists-area' style={{ display: playlistAreaDisplay }}>
        <div className="search-results-area">
          <h2>Listen to this sunny songs!</h2>
          <SearchResults results={props.resultArray} onAddTrack={addTrack} />
        </div>
        <div className="add-playlist-area" style={{ display: sidebarDisplay }} >
          <AddPlaylist playlistArray={playlist} onRemove={removeTrack} onTitle={inputPlaylistTitle} inputValue={playlistTitle} sendPlaylistToSpotify={sendPlaylistToSpotify} />
        </div>
      </div>
    </div>
  );
}

export default HomeContent;
