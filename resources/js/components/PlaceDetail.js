import Axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SA from 'react-bootstrap-sweetalert';
import EmbedMaps from './Maps';

class PlaceDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            place: {
                name: '',
                latitude: '',
                longitude: '',
            },
            alert: ''
        }
    }

    componentDidMount() {
        let placeId = this.props.match.params.id;
        let uri = `/api/place/${placeId}`;
        Axios.get(uri).then(response => {
            if(response.data.status == 200) {
                this.setState({
                    place: response.data.data
                });
            } else {
                const alert = () => (
                    <SA
                        danger
                        title="Error"
                        onConfirm={() => this.props.history.push('/')}
                        timeout={1500}
                        showConfirm={false}
                        showCancel={false}
                    >
                        Place not found!
                    </SA>
                );
                this.setState({alert: alert()});
            }
        });
    }

    render() {
        return (
            <div className="card-body">
                <div className="d-flex align-items-center mb-2">
                    <h4 className="m-0">Places</h4>
                    <div className="ml-auto">
                        <Link className="btn btn-sm btn-link mr-2" to={`/place/edit/${this.props.match.params.id}`}>Edit</Link>
                        <Link className="btn btn-sm btn-primary" to="/">Return</Link>
                    </div>
                </div>
                <div className="form-group">
                    <label>Name</label>
                    <input className="form-control" id="name" type="text" value={this.state.place.name} disabled />
                </div>

                <div className="form-group">
                    <div className="row">
                        <div className="col-md-6">
                            <label>Latitude</label>
                            <input className="form-control" id="latitude" type="text" value={this.state.place.latitude} disabled />
                        </div>

                        <div className="col-md-6">
                            <label>Longitude</label>
                            <input className="form-control" id="longitude" type="text" value={this.state.place.longitude} disabled />
                        </div>
                    </div>
                </div>

                <div className="form-group mb-0">
                    <EmbedMaps
                        latitude={this.state.place.latitude}
                        longitude={this.state.place.longitude}
                    />
                </div>
                {this.state.alert}
            </div>
        )
    }
}

export default PlaceDetail;