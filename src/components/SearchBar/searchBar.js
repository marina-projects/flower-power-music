import './searchBar.css'

function SearchBar(props) {
    return(
        <div className="search-bar-area">
            <button onClick={props.onGetPlaylist} >{props.buttonTitle} </button>
        </div>
    )
}

export default SearchBar;