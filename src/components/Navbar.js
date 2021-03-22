import React, { useState, useEffect } from "react";
import * as ReactBootStrap from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useHistory } from "react-router-dom";
import { Auth  } from "aws-amplify";


import { useAppContext } from "../libs/contextLib";




const Navbar = () => {

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

<<<<<<< Updated upstream
  // async function getUserEmail() {
  //   try {
  //     const user = await Auth.currentSession();
  //     //console.log(user['idToken']['payload']['email'])
  //     setUserEmail(user['idToken']['payload']['email']);
  //   } catch (e) {
  //    alert(e);
  //   }
  // };


  const ActionButtons = (
    <div className="actionButtons">
        <Link to="/new_customer">
          <img className="imgNav" alt="plus" src={ require('../plus_icon.png')} />
        </Link>

        <Link to="/find_customer">
          <img className="imgNav" alt="qr" src={require('../qr_code.png')} />
        </Link>
    </div>
  );

  const notLoggedIn = (
    <>
      <LinkContainer to="/login">
        <Button variant="outline-info" size="nav">Login </Button>
      </LinkContainer>
      <LinkContainer to="/signup">
        <Button variant="outline-info" size="nav">Sign-Up </Button>
      </LinkContainer>
    </>
  );

  const loggedIn = (
    <>
    <Button variant="outline-info" size="nav" onClick={handleLogout}>Logout || { userEmail } </Button>
    <LinkContainer to="/customers">
      <Button variant="outline-info" size="nav">Customers </Button>
    </LinkContainer>
    <LinkContainer to="/orders">
      <Button variant="outline-info" size="nav">Orders </Button>
    </LinkContainer>
    <LinkContainer to="/format">
      <Button variant="outline-info" size="nav">Format </Button>
    </LinkContainer>
    {ActionButtons}
    </>
  );




  return (
    
    <ButtonToolbar className="custom-btn-toolbar">
    { isAuthenticated  ? loggedIn : notLoggedIn }
    </ButtonToolbar>
=======


  return (
    
   

    <Navbar bg="light" variant="light">
    <Navbar.Brand href="/customers"><img className="navbar_logo" src={BuiltspaceLogo} alt=""></img></Navbar.Brand>
    <Nav>
      <li style={{marginLeft:"10px"}} className="nav-item"><Nav.Link href="/customers">Customers</Nav.Link></li>
      <li style={{marginLeft:"10px"}} className="nav-item"><Nav.Link href="/orders">Orders</Nav.Link></li>
    </Nav>
    <Nav style={{marginLeft:"auto"}}>
      <li className="nav-item"><Nav.Link href="/login">Logout</Nav.Link></li>
    </Nav>
  </Navbar>

//   <ReactBootStrap.Navbar collapseOnSelect expand="lg" className="color-nav" variant="dark" style={{boxShadow: "none"}}>
//             <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" className="navDropDown" />
            
//             <div id="logo-href">
// <a href={process.env.PUBLIC_URL + '/#/'} onClick={active}><img src={main_logo2} id="logo-nav" alt="main-logo" /></a>
// </div>
//   <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">

//   <ReactBootStrap.Nav className="mr-auto">

// </ReactBootStrap.Nav>
//     <ReactBootStrap.Nav className='nav-size'> 
      

//       <a href={process.env.PUBLIC_URL + '/#/'} className="nav-font" id="home" onClick={active}>HOME</a>
//       <a href={process.env.PUBLIC_URL + '/#/faq'} className="nav-font" id="faq" onClick={active2}>FAQ</a>
//       <a href={process.env.PUBLIC_URL + '/#/info'} className="nav-font" id="info" onClick={active3}>INFO</a>
//       <a href={process.env.PUBLIC_URL + '/#/about'} className="nav-font" id="about" onClick={active4}>ABOUT</a>

//     </ReactBootStrap.Nav>
//   </ReactBootStrap.Navbar.Collapse>

// </ReactBootStrap.Navbar>



>>>>>>> Stashed changes
  );
}
export default Navbar;