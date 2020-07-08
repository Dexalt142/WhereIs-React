import Axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SA from 'react-bootstrap-sweetalert';

class PlaceCreate extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            latitude: '',
            longitude: '',
            alert: '',
            errors: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.createPlace = this.createPlace.bind(this);
        this.hasError = this.hasError.bind(this);
        this.renderError = this.renderError.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    hasError(field) {
        return !!this.state.errors[field];
    }

    renderError(field) {
        if(this.hasError(field)) {
            return (
                <span className="invalid-feedback">
                    <strong>{this.state.errors[field]}</strong>
                </span>
            );
        }
    }

    createPlace(event) {
        event.preventDefault();
        let uri = '/api/place/store';

        const place = {
            name: this.state.name,
            latitude: this.state.latitude,
            longitude: this.state.longitude,
        }

        if(!place.name || !place.latitude || !place.longitude) {
            let err = [];
            if(!place.name) {
                err['name'] = 'Enter a valid name';
            }

            if(!place.latitude) {
                err['latitude'] = 'Enter a valid latitude';
            }

            if(!place.longitude) {
                err['longitude'] = 'Enter a valid longitude';
            }

            this.setState({errors: err});

            return false;
        }

        Axios.post(uri, place).then(response => {
            if(response.data.status == 201) {
                const alert = () => (
                    <SA
                        success
                        title="Success"
                        onConfirm={() => this.props.history.push('/')}
                        timeout={1500}
                        showConfirm={false}
                        showCancel={false}
                    >
                        A new place has added!
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
                    <h4 className="m-0">Add new place</h4>
                </div>
                <form onSubmit={this.createPlace}>
                    <div className="form-group">
                        <label>Name</label>
                        <input className={`form-control ${this.hasError('name') ? 'is-invalid' : ''}`} id="name" name="name" type="text" value={this.state.name} onChange={this.handleChange} />
                        {this.renderError('name')}
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-6">
                                <label>Latitude</label>
                                <input className={`form-control ${this.hasError('latitude') ? 'is-invalid' : ''}`}  id="latitude" name="latitude" type="text" value={this.state.latitude} onChange={this.handleChange} />
                                {this.renderError('latitude')}
                            </div>

                            <div className="col-md-6">
                                <label>Longitude</label>
                                <input className={`form-control ${this.hasError('longitude') ? 'is-invalid' : ''}`}  id="longitude" name="longitude" type="text" value={this.state.longitude} onChange={this.handleChange} />
                                {this.renderError('longitude')}
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <button className="btn btn-sm btn-primary">Add</button>
                        <Link className="btn btn-sm btn-link" to="/">Return</Link>
                    </div>
                    {this.state.alert}
                </form>
            </div>
        )
    }
}

export default PlaceCreate;