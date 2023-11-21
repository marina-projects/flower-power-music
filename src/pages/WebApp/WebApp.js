import React, { useEffect } from 'react';
import './WebApp.css';

const CLIENT_ID = "6712f703e1f04150b1dca75c9b8defac";
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/webapp";
const SCOPES = [
    "user-read-currently-playing",
    "user-read-playback-state",
    "playlist-read-private",
  ];
const SPACE_DELIMITER = "%20";
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

// http://localhost:3000/webapp#access_token=BQCi4Vjftlq4KSLFMSw-djhL_x-KpfBC09zntqbthUHKFii0uMbTm670zvPm8eENO85G6OwxPZFqNmuzLpXOkMNA6hg2TZ0q_ZNJNDccwSaGsShdetG7qFJDviJ6yOvoe-KVxMxh-sHeGJb5eM9cRy1NLds8FUKRcT5TEFNkrxuxLCmIRPWgo2QjYNZSCn8eaD1Y6Nt0g6qhuna7fo0wqQ&token_type=Bearer&expires_in=3600

const getReturnedParamsFromSpotifyAuth = (hash) => {
    const stringAfterHashtag = hash.substring(1);
    const paramsInUrl = stringAfterHashtag.split("&");
    const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
      console.log(currentValue);
      const [key, value] = currentValue.split("=");
      accumulater[key] = value;
      return accumulater;
    }, {});
  
    return paramsSplitUp;
  };

const WebApp = () => {

    useEffect(() => {
        if(window.location.hash) {
            const { access_token, expires_in, token_type } =
            getReturnedParamsFromSpotifyAuth(window.location.hash);
            
            localStorage.clear();
            localStorage.setItem("accessToken", access_token);
            localStorage.setItem("tokenType", token_type);
            localStorage.setItem("expiresIn", expires_in);
        }
    })
    
    const handleLogin = () => {
        window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
    }

    return (
        <div className='webapp'>
            <h1>Hello!</h1>
            <button onClick={handleLogin}>Login to spotify</button>
        </div>
    );
}

export default WebApp;
