import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Form, Container, Row, Button } from 'react-bootstrap';
import * as xlsx from "xlsx";
import myFile from "./input.xlsx";

function QrGen() {
    const excel = require("xlsx");

    // let workBook = xlsx.readFile("input.xlsx");
    let dataArray = [{
        'Date': '2016-04-02',
        'Region': "BC",
        'Country': 'Canada'},
        {
            'Date': '2016-04-02',
            'Region': "BC",
            'Country': 'Canada'},
            {
                'Date': '2016-04-02',
                'Region': "BC",
                'Country': 'Canada'}
    ];

    let newWorkBook = xlsx.utils.book_new();
    let newWorkSheet = xlsx.utils.json_to_sheet(dataArray);
    xlsx.utils.book_append_sheet(newWorkBook, newWorkSheet, "test sheet");
    xlsx.writeFile(newWorkBook, "New data.xlsx");

    // console.log(workBook.SheetNames);

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home">Builtspace</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
              </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
              </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets">More deets</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            Dank memes
            </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>



            <Container className="Login">
                <div className="custom-login">


                    <Row className="justify-content-center">
                        <strong><h2 id='logs'>Generate QRs</h2></strong>
                    </Row>


                    {/* <Form onSubmit={handleSubmit}> */}
                    <Form >

                        {/* <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              placeholder="example@gmail.com"
              value={fields.email}
              onChange={handleFieldChange}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={fields.password}
              onChange={handleFieldChange}
            />
          </Form.Group> */}


                        <Form.Group>
                            <Form.Label>URLs</Form.Label>
                            <Form.Control type="text" placeholder="Normal text" />
                            <br />
                            <Form.Label>Template</Form.Label>
                            <Form.Control type="text" placeholder="Normal text" />
                            <br /><Form.Label>customer name</Form.Label>
                            <Form.Control type="text" placeholder="Normal text" />
                            <br />
                        </Form.Group>

                        <Button
                            variant="success"
                            block
                            size="lg"
                            type="submit"
                        // isLoading={isLoading}
                        // disabled={!validateForm()}
                        >
                            Generate
        </Button>
                    </Form>

                    {/* <Row className="row-gap">
        <a href={process.env.PUBLIC_URL + '/signup'} className="link-decoration-control">Don't have an account yet?</a>
        </Row>

        <Row className="row-gap">
        <a href={process.env.PUBLIC_URL + '/forgotPass'} className="link-decoration-control">Forgot Password?</a>
        </Row> */}

                </div>
            </Container>



        </div>
    );
}

export default QrGen;
