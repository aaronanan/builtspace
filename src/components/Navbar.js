import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useHistory } from "react-router-dom";
import { Auth  } from "aws-amplify";
import "../styles/Navbar.css";
import { useAppContext } from "../libs/contextLib";
// import { Nav, Form, FormControl } from "react-bootstrap";
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import BuiltspaceLogo from '../assets/company_logo.png'
import * as ReactBootStrap from "react-bootstrap";


const Navbar_home = () => {

  const { userHasAuthenticated } = useAppContext();
  const isAuthenticated = useAppContext().isAuthenticated;
  const [userEmail, setUserEmail] = useState('');
  let history = useHistory();

  //this function allows you to easily seach the local storage using Regex
  function findLocalItems (query) {
    var i, results = [];
    for (i in localStorage) {
      if (localStorage.hasOwnProperty(i)) {
        if (i.match(query) || (!query && typeof i === 'string')) {
          const value = JSON.parse(localStorage.getItem(i));
          results.push({key:i,val:value});
        }
      }
    }
    return results;
  }

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    history.push('/login')
    setUserEmail('');
  }

  // retrieve the email from localstorage using the custom findLocalItems function
  useEffect(() => {
    if (localStorage.length > 0) {
      const pattern = /CognitoIdentityServiceProvider.*.userData/;
      const userInfo = findLocalItems(pattern);
      const uEmail = userInfo[0].val.UserAttributes.slice(-1).pop().Value
      setUserEmail(uEmail);
    }
  }, []);

  

  return (
    
    // <ButtonToolbar className="custom-btn-toolbar">
    // { isAuthenticated  ? loggedIn : notLoggedIn }
    // </ButtonToolbar>

    // loggedIn 
    
    
    // <>
    // test
    // </>
  //   <div className="navbar_header">
  //   <Navbar bg="light" variant="light">
  //   <Navbar.Brand href="/customers"><img className="navbar_logo" src={BuiltspaceLogo} alt=""></img></Navbar.Brand>
  //   <Nav>
  //     <li style={{marginLeft:"10px"}} className="nav-item"><Nav.Link href="/customers">Customers</Nav.Link></li>
  //     <li style={{marginLeft:"10px"}} className="nav-item"><Nav.Link href="/orders">Orders</Nav.Link></li>
  //   </Nav>
  //   <Nav style={{marginLeft:"auto"}}>
  //     <li className="nav-item"><Nav.Link href="/login">Logout</Nav.Link></li>
  //   </Nav>
  // </Navbar>
  // </div>

  <ReactBootStrap.Navbar collapseOnSelect expand="lg" className="color-nav" variant="dark" style={{boxShadow: "none"}}>
  <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" className="navDropDown" />
  
  <div id="logo-href">
<a href={process.env.PUBLIC_URL + '/#/'}><img src={BuiltspaceLogo} id="logo-nav" alt="main-logo" /></a>
</div>
<ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">

<ReactBootStrap.Nav className="mr-auto">

</ReactBootStrap.Nav>
<ReactBootStrap.Nav className='nav-size'> 

<a href={process.env.PUBLIC_URL + '/customers'} className="nav-font" id="home" >Customers</a>
<a href={process.env.PUBLIC_URL + '/orders'} className="nav-font" id="faq" >Orders</a>


</ReactBootStrap.Nav>
</ReactBootStrap.Navbar.Collapse>

</ReactBootStrap.Navbar>

  );
}

export default Navbar_home;