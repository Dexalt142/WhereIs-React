import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import Routes from './routes';

class Main extends Component {
    
    render() {
        return (
            <BrowserRouter>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-8 mx-auto">
                            <div className="card">
                                <Routes/>
                            </div>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        ) 
    }

}

ReactDOM.render(<Main/>, document.querySelector("#app"));