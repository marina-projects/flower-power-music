import './App.css';
import SearchBar from '../SearchBar/searchBar';
import SearchResults from '../SearchResults/searchResults';
import AddPlaylist from '../AddPlaylist/addPlaylist';
import Footer from '../Footer/footer';
import { resultsArray } from '../../arrays/resultArray';
import { useState, useCallback } from 'react';
import WebApi from '../WebApi/WebApi';
import SignUpForm from '../SignUpForm/SignUpForm';


// UseCallback is for caching issues, it should wrap function with state updating and has a second argument - what state should be updating in current render

function App() {
  const [playlist, setPlaylist] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTitle, setPlaylistTitle] = useState('New playlist');
  const [playlistAreaDisplay, setPlaylistAreaDisplay] = useState('none');
  const [buttonTitle, setButtonTitle] = useState('Get a random 30 songs!');
  const [sidebarDisplay, setSidebarDisplay] = useState('none');

  const playlistDisplay = () => {
    setPlaylistAreaDisplay('flex');
    setSearchResults(resultsArray);
    setButtonTitle('Show another songs');
  }

  // addTrack and removeTrack are sending to <Track /> component to use them on onClick event 

  const addTrack = useCallback(
    (track) => {
      setSidebarDisplay('flex');
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
      <div className="App-header"></div>
      <WebApi />
      <SearchBar onGetPlaylist={playlistDisplay} buttonTitle={buttonTitle}/>
      <div className='playlists-area' style={{display: playlistAreaDisplay}}>
        <div className="search-results-area">
          <h2>Listen to this sunny songs!</h2>
          <SearchResults results={searchResults} onAddTrack={addTrack} />
        </div>
        <div className="add-playlist-area" style={{display: sidebarDisplay}} >
          <AddPlaylist playlistArray={playlist} onRemove={removeTrack} onTitle={inputPlaylistTitle} inputValue={playlistTitle} />
        </div>
      </div>
      <SignUpForm />
      <Footer />
    </div>
  );
}

export default App;
