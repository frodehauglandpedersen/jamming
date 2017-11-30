import React from 'react';
import './Search.css';

class Search extends React.Component {
    render() {
        return(
        < div className = "Search" >
                <input placeholder="Enter A Song Title" />
                <a>SEARCH</a>
        </div>
        )
    }
}

export default Search;
