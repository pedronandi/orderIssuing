import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import CreateOrder from './pages/CreateOrder';
import UpdateOrder from './pages/UpdateOrder';

function Routes() {
  return (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Landing}/>
            <Route path="/order/create" component={CreateOrder}/>
            <Route path="/order/update/:id" component={UpdateOrder}/>
        </Switch>
    </BrowserRouter>
  );
}

export default Routes;