import Axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SA from 'react-bootstrap-sweetalert';

class PlaceIndex extends Component {

    constructor() {
        super();
        this.state = {
            places: [],
            alert: null,
            empty: ''
        }
    }

    deleteConfirmation(id) {
        const alert = () => (
            <SA
                warning
                showCancel
                title="Delete"
                confirmBtnText="Delete"
                cancelBtnText="Cancel"
                onConfirm={() => this.deletePlace(id)}
                onCancel={() => this.setState({alert: null})}
            >
                Are you sure want to delete this place?
            </SA>
        );
        this.setState({alert: alert()});
    }

    deletePlace(id) {
        let uri = `/api/place/delete/${id}`;
        Axios.delete(uri).then(response => {
            if(response.data.status == 200) {
                this.setState({alert: null});

                const alert = () => (
                    <SA
                        success
                        title="Success"
                        onConfirm={() => this.deleted()}
                        timeout={1000}
                        showConfirm={false}
                        showCancel={false}
                    >
                        Place deleted!
                    </SA>
                );
                this.setState({alert: alert()});
            }
        });
    }

    deleted() {
        this.componentDidMount();
        this.setState({alert: null});
    }

    componentDidMount() {
        let uri = '/api/places';
        Axios.get(uri).then(response => {
            this.setState({
                places: response.data.data
            });
            if(response.data.data.length < 1) {
                const empty = () => (
                    <div className="text-center">
                        There is no places right now.
                    </div>
                );
                this.setState({empty: empty()});
            }
        });
    }

    render() {
        const { places } = this.state;
        return (
            <div className="card-body">
                <div className="d-flex align-items-center mb-2">
                    <h4 className="m-0">Places</h4>
                    <Link className="btn btn-sm btn-primary ml-auto" to='/place/create'>Add new place</Link>
                </div>
                <div className="table-responsive">
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                                <td>No.</td>
                                <td>Name</td>
                                <td>Latitude</td>
                                <td>Longitude</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            { places.map((place, index) => (
                                <tr key={index}> 
                                    <td>{ index + 1 }</td>
                                    <td>{ place.name }</td>
                                    <td>{ place.latitude }</td>
                                    <td>{ place.longitude }</td>
                                    <td>
                                        <div className="btn-group">
                                            <Link className="btn btn-sm btn-primary" to={`/place/${place.id}`}>Detail</Link>
                                            <Link className="btn btn-sm btn-success" to={`/place/edit/${place.id}`}>Edit</Link>
                                            <button className="btn btn-sm btn-danger" onClick={() => this.deleteConfirmation(place.id)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            )) }
                        </tbody>
                    </table>
                </div>
                {this.state.empty}
                {this.state.alert}
            </div>
        )
    }
}   

export default PlaceIndex;