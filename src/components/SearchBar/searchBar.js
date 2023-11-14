import './searchBar.css'

function SearchBar() {
    return(
        <div className="search-bar-area">
            <form>
                <input type="text" placeholder="Find music" />
                <button>Search</button>
            </form>
        </div>
    )
}

export default SearchBar;