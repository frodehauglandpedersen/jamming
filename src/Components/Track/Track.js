import React from 'react';
import './Track.css';

class Track extends React.Component {

    renderAction() {
        if (Track.props.isRemoval == true) {
            <a className="TrackAction">-</a>
        } else {
            <a className="TrackAction">+</a>
        }
    }

    render() {
        return (
            <div className="Outer">
                <div className="Track">
                    <div className="Track-information">
                        <h3>It's Not Right But It's Okay</h3>
                        <p>Whitney Houston | My Love Is Your Love</p>
                    </div>
                    <a className="Track-action">-</a>
                </div>
                <div className="Track">
                    <div className="Track-information">
                        <h3>Yo Mama</h3>
                        <p>P Diddy | My Love Is Your Love</p>
                    </div>
                    <a className="Track-action">-</a>
                </div>
            </div>
        )
    }
}

export default Track;



