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


  // async function getUserEmail() {
  //   try {
  //     const user = await Auth.currentSession();
  //     //console.log(user['idToken']['payload']['email'])
  //     setUserEmail(user['idToken']['payload']['email']);
  //   } catch (e) {
  //    alert(e);
  //   }
  // };


  const notLoggedIn = (
    <div className="navbar_header">
    <Navbar bg="light" variant="light">
    <Navbar.Brand href="/#/customers"><img className="navbar_logo" src={BuiltspaceLogo} alt=""></img></Navbar.Brand>
    {/* <Nav>
      <li style={{marginLeft:"10px"}} className="nav-item"><Nav.Link href="/#/customers">Customers</Nav.Link></li>
      <li style={{marginLeft:"10px"}} className="nav-item"><Nav.Link href="/#/orders">Orders</Nav.Link></li>
    </Nav> */}
    <Nav style={{marginLeft:"auto"}}>
      <li className="nav-item"><Nav.Link href="/#/login">Login</Nav.Link></li>
      <li className="nav-item"><Nav.Link href="/#/signup">Signup</Nav.Link></li>
    </Nav>
  </Navbar>
  </div>
  );

  const loggedIn = (
      <div className="navbar_header">
      <Navbar bg="light" variant="light">
      <Navbar.Brand href="/#/customers"><img className="navbar_logo" src={BuiltspaceLogo} alt=""></img></Navbar.Brand>
      <Nav>
        <li style={{marginLeft:"10px"}} className="nav-item"><Nav.Link href="/#/customers">Customers</Nav.Link></li>
        <li style={{marginLeft:"10px"}} className="nav-item"><Nav.Link href="/#/orders">Orders</Nav.Link></li>
      </Nav>
      <Nav style={{marginLeft:"auto"}}>
        <li className="nav-item"><Nav.Link href="/#/login" onClick={handleLogout}>Logout</Nav.Link></li>
      </Nav>
    </Navbar>
    </div>
  );

  // useEffect(()=>document.getElementById("customers_page").focus(), [])


  return (
    
    // // <ButtonToolbar className="custom-btn-toolbar">
    // <>
    // { isAuthenticated  ? loggedIn : notLoggedIn }
    // {/* // </ButtonToolbar> */}

    // loggedIn 
    
    
    <>
      { isAuthenticated  ? loggedIn : notLoggedIn }
    </>

  );
}

export default Navbar_home;