import '../../Track/track.css';
import React, { useCallback } from 'react';

function AddedTrack (props) {
    const { onAdd, onRemove, track, isRemoval, song, singer } = props;

    const addTrack = useCallback(() => {
        onAdd(track);
    }, [onAdd, track]);

    const removeTrack = useCallback(() => {
        onRemove(track);
    }, [onRemove, track]);

    const renderButton = () => {
        if (isRemoval) {
            return (
                <button onClick={removeTrack}>-</button>
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
                <h3>{song}</h3>
                <p>{singer}</p>
            </div>
            {renderButton()}
        </div>
    )
}

export default AddedTrack;
