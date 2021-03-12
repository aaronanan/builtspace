import React, { useState, useEffect } from "react";
import { Route, Switch } from 'react-router-dom';

import Amplify, { Auth } from 'aws-amplify'
import awsconfig from './aws-exports';

import { AppContext } from "./libs/contextLib";
import { onError } from "./libs/errorLib";

// Components
import Form from './components/Form';
import Orders from './components/Orders';
import Customers from './components/Customers';
import NavBar from './components/Navbar';
import Create_order from "./components/create_order";
import CreateOrder from "./components/CreateOrder";
import Profile from "./components/Profile";
import Login from "./components/Login"

import Signup from "./components/Signup";



Amplify.configure(awsconfig);

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
 
  // Call the onLoad function only once on page load
  useEffect(() => {
    onLoad();
  }, []);
  
  // Check if user is signed in
  async function onLoad() {
    console.log("Auth:", Auth)
    console.log(Auth.currentSession())
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        onError(e);
      }
    }
    setIsAuthenticating(false);
  }

  return (
    !isAuthenticating && (
    <div className="App">
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <NavBar />
          <Switch>
            <Route path='/customers' component={Customers} />
            <Route path='/orders' component={Orders} />
            <Route path='/new_customer' component={Form} />
            <Route path='/create_order' component={Create_order} />
            <Route path='/creating_order' component={CreateOrder} />
            <Route path='/profile/' component={Profile} />
            {/* <Route path='/login' component={Login} />
            <Route exact path="/signup">
              <Signup />
            </Route> */}
          </Switch>
        </AppContext.Provider>
    </div>
    )
  );
  isAuthenticating && (
    <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
    <NavBar />
      <Switch>
        <Route path='/customers' component={Customers} />
        <Route path='/orders' component={Orders} />
        <Route path='/new_customer' component={Form} />
        <Route path='/create_order' component={Create_order} />
        <Route path='/creating_order' component={CreateOrder} />
        <Route path='/profile/' component={Profile} />
        {/* <Route path='/login' component={Login} />
        <Route exact path="/signup">
          <Signup />
        </Route> */}
      </Switch>
    </AppContext.Provider>
  )

}

export default App