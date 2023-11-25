import './track.css';
import React, { useCallback } from 'react';
import AudioExample from '../Audio Example/audioExample';

function Track (props) {

    const addTrack = useCallback(
        (event) => {
          props.onAdd(props.track);
        },
        [props]
      );

    const removeTrack = useCallback(
        (event) => {
            props.onRemove(props.track);
        }, [props]
    )

    const renderButton = () => {
        if(props.isRemoval) {
            return (
                <button onClick={removeTrack} >-</button>
            ) 
        } else {
            return (
                <button onClick={addTrack}>+</button>
            )
        }
    } 

    return (
        <div className="track-area">
             <AudioExample idTrack={props.idTrack} token={props.token}/>
            <div className="track-texts">
                <h3>{props.song}</h3>
                <p>{props.singer}</p>
            </div>
            {renderButton()}
        </div>
    )
}

export default Track;