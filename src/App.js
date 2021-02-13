import React, { useState, useEffect } from "react";
import './styles/App.css';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { AppContext } from "./libs/contextLib";
import { Auth } from "aws-amplify";



// Components
import Form from './components/Form';
import Orders from './components/Orders';
import Customers from './components/Customers';
import NavBar from './components/Navbar';
import { Route, Switch } from 'react-router-dom';
import Customer from "./components/Customer";
import CreateOrder from "./components/CreateOrder";
import Format from "./components/Format";
import Profile from "./components/Profile";
import Login from "./components/Login"
import { onError } from "./libs/errorLib";
import Signup from "./components/Signup";



Amplify.configure(awsconfig);

function App() {
  const URL = awsconfig.aws_cloud_logic_custom.endpoint;
  console.log(URL)
  const [isAuthenticated, userHasAuthenticated] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
 
  // Call the onLoad function only once on page load
  useEffect(() => {
    onLoad();
  }, []);
  
  // Check if user is signed in
  async function onLoad() {
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
            <Route path='/find_customer' component={Customer} />
            <Route path='/create_order' component={CreateOrder} />
            <Route path='/format' component={Format} />
            <Route path='/profile' component={Profile} />
            <Route path='/login' component={Login} />
            <Route exact path="/signup">
              <Signup />
            </Route>
          </Switch>
          </AppContext.Provider>
    </div>
    )
  );
}

export default App;