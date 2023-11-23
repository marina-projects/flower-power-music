import '../../Track/track.css';
import React, { useCallback } from 'react';

function AddedTrack (props) {

    const addTrack = useCallback(
        (event) => {
          props.onAdd(props.track);
        },
        [props.onAdd, props.track]
      );

    const removeTrack = useCallback(
        (event) => {
            props.onRemove(props.track);
        }, [props.onRemove, props.track]
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
            <div className="track-texts">
                <h3>{props.song}</h3>
                <p>{props.singer}</p>
            </div>
            {renderButton()}
        </div>
    )
}

export default AddedTrack;