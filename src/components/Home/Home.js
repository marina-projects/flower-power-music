import React, {useState, useCallback} from "react";
import SearchBar from "../SearchBar/searchBar";
import SearchResults from "../SearchResults/searchResults";
import AddPlaylist from "../AddPlaylist/addPlaylist";
import {resultsArray} from "../../arrays/resultArray";
import './Home.css';

const HomeContent = (props) => {

  // UseCallback is for caching issues, it should wrap function with state updating and has a second argument - what state should be updating in current render

  const [playlist, setPlaylist] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTitle, setPlaylistTitle] = useState('New playlist');
  const [playlistAreaDisplay, setPlaylistAreaDisplay] = useState('none');
  const [buttonTitle, setButtonTitle] = useState('Get a random 30 songs!');
  const [sidebarDisplay, setSidebarDisplay] = useState('none');

  const playlistDisplay = () => {
    props.handleGetPlaylists();
    setPlaylistAreaDisplay('flex');
    setSearchResults(props.resultArray);
    setButtonTitle('Show another songs');
  }

  // addTrack and removeTrack are sending to <Track /> component to use them on onClick event 

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

    return (
        <div className="home-content">
            <SearchBar onGetPlaylist={playlistDisplay} buttonTitle={buttonTitle} handleGetPlaylists={props.handleGetPlaylists} />
            <div className='playlists-area' style={{display: playlistAreaDisplay}}>
                <div className="search-results-area">
                    <h2>Listen to this sunny songs!</h2>
                    <SearchResults results={props.resultArray} onAddTrack={addTrack} />
                </div>
                <div className="add-playlist-area" style={{display: sidebarDisplay}} >
                    <AddPlaylist playlistArray={playlist} onRemove={removeTrack} onTitle={inputPlaylistTitle} inputValue={playlistTitle} />
                </div>
            </div>
        </div>
    )
}


export default HomeContent;