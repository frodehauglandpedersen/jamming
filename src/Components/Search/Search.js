import React from 'react';
import './Search.css';

class Search extends React.Component {

    constructor(props){
        super(props);
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    search() {
        this.props.onSearch(this.state.term);
    }

    handleTermChange(e){
        this.setState({term: e.target.value});
    }

    render() {
        return (
            < div className="Search" >
                <input onChange={this.handleTermChange} placeholder="Enter A Song Title" />
                <a onClick={this.search}>SEARCH</a>
            </div>
        )
    }
}

export default Search;
