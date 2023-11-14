import './searchResults.css';
import Track from '../Track/Track';

function SearchResults (props) {
    return(
        <div>
            {props.results.map((track) => {
                return (
                    <Track song={track.song} singer={track.singer} onAdd={props.onAddTrack} track={track} />
                )
            })}
        </div>
    )            
}

export default SearchResults;