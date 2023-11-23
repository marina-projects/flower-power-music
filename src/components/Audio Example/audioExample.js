import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './AudioExample.css';
import PLAY from './play-button-arrowhead.png';
import PAUSE from "./pause-button.png";

const AudioExample = (props) => {
  const [trackData, setTrackData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  //useRef дает доступ к данным компонента
  const audioRef = useRef(null);

  useEffect(() => {
    const getTrackInfo = async () => {
      try {
        const response = await axios.get(`https://api.spotify.com/v1/tracks/${props.idTrack}`, {
          headers: {
            'Authorization': `Bearer ${props.token}`,
            'Content-Type': 'application/json',
          },
        });

        const trackData = response.data;
        setTrackData(trackData);
      } catch (error) {
        console.error('Error fetching track information:', error);
      }
    };

    getTrackInfo();
  }, [props.idTrack, props.token]);

  const togglePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };


  return (
    <div className='audio-example'>
      {trackData && trackData.preview_url ? (
        <div>
          <audio ref={audioRef} >
            <source src={trackData.preview_url} type="audio/mp3" />
            Your browser does not support the audio tag.
          </audio>
          <button onClick={togglePlayPause}>{isPlaying ? <img className="icons" src={PAUSE} alt="" /> : <img className="icons" src={PLAY} alt="" /> }</button>
        </div>
      ) : (
        <p>Audio preview is not available for this track.</p>
      )}
    </div>
  );
};

export default AudioExample;
