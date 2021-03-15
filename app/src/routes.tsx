import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import CreateOrder from './pages/CreateOrder'

function Routes() {
  return (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Landing}/>
            <Route path="/order/create" exact component={CreateOrder}/>
        </Switch>
    </BrowserRouter>
  );
}

export default Routes;