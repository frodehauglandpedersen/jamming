import React from 'react';
import './PlayList.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {

    constructor(props){
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(e){
        const playlistName = e.target.value;
        this.props.onNameChange(playlistName);
    }
    
    render() {
        return (
                <div className="Playlist">
                    <input defaultValue={'New Playlist'} onChange={this.handleNameChange}/>
                     <TrackList tracks={this.props.playlistTracks} />
                    <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
                </div>
        )
    }
};

export default Playlist;