
import React from 'react';
import './TrackList.css';
import SearchResults from '../SearchResults/SearchResults';
import Track from '../Track/Track';

class TrackList extends React.Component {

    render() {

        return (
            <div className="TrackList">
                {this.props.TrackList.map(track => { 
                return <Track track = {track} key={track.id}/>;
                })}
            </div>
        )
    }
};


export default TrackList;