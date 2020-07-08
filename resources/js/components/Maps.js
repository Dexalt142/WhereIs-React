import React, { Component } from 'react';

class Maps extends Component {
    render() {
        return (
            <iframe width="100%" height="400px" style={{border: 0}} src={`https://maps.google.com/maps?q=${this.props.latitude},${this.props.longitude}&z=14&output=embed`} />
        )
    }
}

export default Maps;