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
          const playlistItems = response.data.items;
          setDataArray(playlistItems);
          console.log(dataArray)
        })
        .catch((error) => {
          console.log(error);
        });
    };

  return (
      <div className="App">
        <Header />
        <HomeContent resultArray={dataArray} handleGetPlaylists={handleGetPlaylists} />
        <Footer />
      </div>
  );
}

export default App;
