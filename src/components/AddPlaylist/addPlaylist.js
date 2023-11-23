import './addPlaylist.css';
import AddedTrack from '../Track/AddedTrack/AddedTrack';


function AddPlaylist (props) {
    return(
        <div className="custom-playlist">
            <h2>Add to playlist</h2>
            <div className='playlist-title-area'>
                <h3>Enter playlist title: </h3>
                <input type="text" placeholder='Create a title for your custom playlist' onChange={props.onTitle} value={props.inputValue} />
            </div>
            
            {props.playlistArray.map((i) => {
                return (
                    <AddedTrack song={i.track.name} singer={i.track.artists[0].name} key={i.id} track={i} isRemoval={true} onRemove={props.onRemove} />
                )
            })}
            <button onClick={props.sendPlaylistToSpotify}>Save to spotify</button>
        </div>
    )            
}

export default AddPlaylist;