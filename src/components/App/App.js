import React, { useEffect, useState } from 'react';
import Footer from '../Footer/footer';
import HomeContent from '../Home/Home';
import './App.css';
import Header from '../Header/header';
import axios from 'axios';
import * as SPOT from '../../constants/spotifyData';
import WelcomeScreen from '../WelcomeScreen/WelcomeScreen';

function App() {
  const [token, setToken] = useState('');
  const [dataArray, setDataArray] = useState([]);
  const [randomTracksArray, setRandomTracksArray] = useState([]);
  const [homeContentDisplay, setHomeContentDisplay] = useState('none');
  const [welcomeDisplay, setWelcomeDisplay] = useState('flex');

  // подключаем Spotify
  useEffect(() => {
    // не очень поняла, что это за метод, но он позволяет даже с измнением URL (после запроса из Spotify) менять видимость компонентов
    window.onhashchange = () => {
      if (window.location.hash) {
        const { access_token, expires_in, token_type } = SPOT.getReturnedParamsFromSpotifyAuth(window.location.hash);

        localStorage.clear();
        localStorage.setItem("accessToken", access_token);
        localStorage.setItem("tokenType", token_type);
        localStorage.setItem("expiresIn", expires_in);

        setHomeContentDisplay('flex');
        setWelcomeDisplay('none');
      }
    };

    // вызываем обработчик сразу при загрузке компонента
    window.onhashchange();
  }, []);

  // берем токены для подключения спотифай
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setToken(localStorage.getItem('accessToken'));
    }
  }, []);

  // вспомогательный показ полученных данных в консоли
  useEffect(() => {
    console.log(dataArray);
  }, [dataArray]);

  // получаем плейлист из Spotify
  const handleGetPlaylists = async () => {
    await axios
      .get(SPOT.PLAYLISTS_ENDPOINT, {
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

  // получаем 10 рандомных треков
  const getRandomTracks = (dataArray, numberOfTracks) => {
    const shuffledArray = [...dataArray];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray.slice(0, numberOfTracks);
  };

  // устанавливаем 10 случайных песен в стейт
  useEffect(() => {
    const randomTracks = getRandomTracks(dataArray, 10);
    setRandomTracksArray(randomTracks);
  }, [dataArray]);

  // функция для логина через Spotify, передаем на кнопку
  const handleLogin = () => {
    window.location = `${SPOT.SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${SPOT.CLIENT_ID}&redirect_uri=${SPOT.REDIRECT_URL_AFTER_LOGIN}&scope=${SPOT.SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
  }

  return (
    <div className="App">
      <Header />
      <div style={{ display: welcomeDisplay }}>
        <WelcomeScreen handleLogin={handleLogin} />
      </div>
      <div style={{ display: homeContentDisplay }}>
        <HomeContent resultArray={randomTracksArray} handleGetPlaylists={handleGetPlaylists} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
