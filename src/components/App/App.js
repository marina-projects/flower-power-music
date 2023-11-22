import React, {useEffect, useState} from 'react';
import Footer from '../Footer/footer';
import HomeContent from '../Home/Home';
import './App.css';
import Header from '../Header/header';
import axios from 'axios';

const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/playlists/2F4zH00XCKtHV7eMG2E3Qq/tracks";

function App() {

  const [token, setToken] = useState('');
  const [dataArray, setDataArray] = useState([]);
  const [randomTracksArray, setRandomTracksArray] = useState([]);

  useEffect(() => {
      if(localStorage.getItem('accessToken')) {
          setToken(localStorage.getItem('accessToken'));
      }
  }, []);

  useEffect(() => {
      console.log(dataArray);
  }, [dataArray]);

  useEffect(() => {
    // Вызываем функцию для получения 30 случайных треков
    const randomTracks = getRandomTracks(dataArray, 30);
    setRandomTracksArray(randomTracks);
  }, [dataArray]);

  const handleGetPlaylists = async () => {
    await axios
      .get(PLAYLISTS_ENDPOINT, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const playlistItems = response.data.items;
        setDataArray(playlistItems);
        console.log(dataArray);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getRandomTracks = (dataArray, numberOfTracks) => {
    const shuffledArray = [...dataArray];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray.slice(0, numberOfTracks);
  };

  return (
      <div className="App">
        <Header />
        <HomeContent resultArray={randomTracksArray} handleGetPlaylists={handleGetPlaylists} />
        <Footer />
      </div>
  );
}

export default App;
