import './addPlaylist.css';
import Track from '../Track/Track';


function AddPlaylist (props) {
    return(
        <div>
            <h2>Add to playlist</h2>
            <h3>Playlist title</h3>
            <input type="text" placeholder='Create a title for your custom playlist' onChange={props.onTitle} value={props.inputValue} />
            {props.playlistArray.map((track) => {
                return (
                    <Track song={track.song} singer={track.singer} key={track.id} track={track} isRemoval={true} onRemove={props.onRemove} />
                )
            })}
            <button>Save to spotify</button>
        </div>
    )            
}

export default AddPlaylist;