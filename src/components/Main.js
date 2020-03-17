import { Switch, Route } from 'react-router-dom'
import React from 'react';

import Home from "./Home"
import Countries from "./Countries"

const Main = () => (
    <Switch>
        <Route exact path='/' component={Home}/>
        {/*<Route exact path='/countries' component={Countries}/>*/}
    </Switch>

);

export default Main;