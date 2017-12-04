


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
    //  if(track.id) task 41. Tror det er endel funky greier her.
    let pushTrack = this.state.playlistTracks.push(track);
    this.setState({ pushTrack });    
  }

  removeTrack(track) {
    // steg 49 må fikses. Denne er feil.
    delete this.playlistTracks.track;
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

   savePlaylist() {
   let trackURIs = [];
    this.state.playlistTracks.forEach(track => trackURIs.push(track.uri));
    console.log("lagrer spilleliste");
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({playlistName:'Ny spilleliste', playlistTracks: [], });
  }

  


  search(term) {
    console.log(term);
    Spotify.search(term).then(searchResults => this.setState({searchResults: searchResults}));

  } 





  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <Search onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults onAdd={this.addTrack} onRemove={this.removeTrack} searchResults={this.state.searchResults} isRemoval={false} />
            <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onChange={this.handleNameChange} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.props.onRemove} />
          </div>
        </div>
      </div>
    );
  }
}

//this.state = { searchResults: [{ name: "Song", artist: "Artist", album: "Album", id: 'ID', }], }


export default App;
