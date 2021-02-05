import React, { Component } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import logo from '../assets/logo.png'


function NavbarHome() {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="home"><img src={logo} width="150px"></img></Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {/* <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            <NavDropdown title="Testing" id="collasible-nav-dropdown">
              <NavDropdown.Item href="find_customer">Add Order</NavDropdown.Item>
              <NavDropdown.Item href="new_customer">Add Customer</NavDropdown.Item>
              <NavDropdown.Item href="customer_reg">New Add Customer</NavDropdown.Item>
              {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item> */}
              {/* <NavDropdown.Divider /> */}
              {/* <NavDropdown.Item href="#action/3.4">
                Separated link</NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="customers">Customers</Nav.Link>
            <Nav.Link href="orders">Orders</Nav.Link>
            <Nav.Link href="login">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarHome;
