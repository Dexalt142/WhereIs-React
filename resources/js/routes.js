import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PlaceIndex from './components/PlaceIndex';
import PlaceDetail from './components/PlaceDetail';
import PlaceCreate from './components/PlaceCreate';
import PlaceEdit from './components/PlaceEdit';

const Routes = () => (
    <Switch>
        <Route exact path='/' component={PlaceIndex}/>
        <Route exact path='/place/create' component={PlaceCreate}/>
        <Route path='/place/edit/:id' component={PlaceEdit}/>
        <Route path='/place/:id' component={PlaceDetail}/>
    </Switch>
)

export default Routes;