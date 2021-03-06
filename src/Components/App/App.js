import React from 'react';
import './App.css';
import Search from '../Search/Search';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../PlayList/PlayList';
import Spotify from '../../util/Spotify';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'Min spilleliste',
      playlistTracks: []
    }
    this.addTrack = this.addTrack.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let pushTrack = this.state.playlistTracks.push(track);
    this.setState({ pushTrack });
  }

  removeTrack(track) {
    let findSong = track.id;
    let removeIt = this.state.playlistTracks.pop(findSong);
    this.setState({ removeIt });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    let trackURIs = [];
    this.state.playlistTracks.forEach(track => trackURIs.push(track.uri));
    console.log("lagrer spilleliste");
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({ playlistName: 'Ny spilleliste', playlistTracks: [], });
  }

  search(term) {
    console.log(term);
    Spotify.search(term).then(searchResults => this.setState({ searchResults: searchResults }));
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <Search onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults} isRemoval={false} />
            <Playlist isRemoval={true} onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onChange={this.handleNameChange} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
