import './App.css';
import SearchBar from '../SearchBar/searchBar';
import SearchResults from '../SearchResults/searchResults';
import AddPlaylist from '../AddPlaylist/addPlaylist';
import { resultsArray } from '../../arrays/resultArray';
import { useState, useCallback } from 'react';


// UseCallback is for caching issues, it should wrap function with state updating and has a second argument - what state should be updating in current render

function App() {
  const [playlist, setPlaylist] = useState([]);
  const [playlistTitle, setPlaylistTitle] = useState('New playlist');

  // addTrack and removeTrack are sending to <Track /> component to use them on onClick event 

  const addTrack = useCallback(
    (track) => {
      if (playlist.some((savedTrack) => savedTrack.id === track.id))
        return;

      setPlaylist((prevTracks) => [...prevTracks, track]);
    },
    [playlist]
  );

  const removeTrack = useCallback((track) => {
    setPlaylist((prevTracks) =>
      prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
    );
  }, []
  );

  const inputPlaylistTitle = (event) => {
    setPlaylistTitle(event.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Flower Power</h1>      
      </header>
      <SearchBar />
      <div className='playlists-area'>
        <div className="search-results-area">
          <h2>Search results</h2>
          <SearchResults results={resultsArray} onAddTrack={addTrack} />
        </div>
        <div className="add-playlist-area">
          <AddPlaylist playlistArray={playlist} onRemove={removeTrack} onTitle={inputPlaylistTitle} inputValue={playlistTitle} />
        </div>
      </div>
    </div>
  );
}

export default App;
