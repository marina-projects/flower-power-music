export const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/playlists/2F4zH00XCKtHV7eMG2E3Qq/tracks";


export const CLIENT_ID = "6712f703e1f04150b1dca75c9b8defac";
export const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
export const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/webapp";
export const SCOPES = [
    "user-read-currently-playing",
    "user-read-playback-state",
    "playlist-read-private",
  ];
export const SPACE_DELIMITER = "%20";
export const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

export const getReturnedParamsFromSpotifyAuth = (hash) => {
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