import React from "react";
import { Route, Switch } from 'react-router-dom';

// Components
import Customers from './components/Customers';
import Orders from './components/Orders';
import Form from './components/Form';
import Create_order from "./components/create_order";
import CreateOrder from "./components/CreateOrder";
import Profile from "./components/Profile";


function Router() {

  return (
    <div className="Router">
      <Switch>
        <Route path='/customers' component={Customers} />
        <Route path='/orders' component={Orders} />
        <Route path='/new_customer' component={Form} />
        <Route path='/create_order' component={Create_order} />
        <Route path='/creating_order' component={CreateOrder} />
        <Route path='/profile/' component={Profile} />
      </Switch>
    </div>
  );
}

export default Router