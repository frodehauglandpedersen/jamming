import React, { Component } from 'react';
import './App.css';
import Search from '../Search/Search';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../PlayList/PlayList';

class App extends React.Component {

  constructor(props) {
    super();
    this.state = {
      searchResults: [],
      }
  }

  

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          {/* <Search /> */}
          <div className="App-playlist">
            <SearchResults SearchResults={this.state.SearchResults} />
            {/*<Playlist />*/}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
