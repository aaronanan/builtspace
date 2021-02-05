import React, { useState } from "react";
import axios from 'axios';
import {Button, Container, Row, Col} from 'react-bootstrap'
import awsconfig from '../aws-exports';
import './CustomerReg.css'

// TODO: Store multiple values in one state instead of having state for each field
// This form currently accepts input for Organization, Customer Name and Status and passes the rest of the data fields as blank/null




function Registration(props) {

  const URL = awsconfig.aws_cloud_logic_custom[0].endpoint;

  const [name, setName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [status, setStatus] = useState("Active");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");


    
    function handleSubmit(e) {
        e.preventDefault();
      axios.post(URL + '/customers', {
        "org_name": orgName,
        "cus_status": status,
        "contact_name": name, 
        "contact_person": {
            "email":Email,
            "phone":Phone
        },
        "ship_address": {
          "Address": "redda",
          "City": "Gotha",
          "prov": "BC",
          "post_code": "123",
          "country": "canada"
        },
        "pref_des": "",
        "org_id": "",
        "serial_prefix": "",
        
        "sales_contact": {
          "name": "sdafsadf",
          "email": "",
          "phone": ""
        },
        "partner_id": "",
        "partner_contact": {
          "name": "",
          "email": "",
          "phone": ""
        }
      })
      .then(function (response) {
          if (response.status == 200){
              alert("Thank you for successfully submitting your order!")
          }else{
              alert("There was an error in your information")
          }
      })
      .catch(function (error) {
        console.log(error);
      });
      setName("");
      setOrgName("");
      setStatus(status);
      setEmail("");
      setPhone("");
    }

  return (
    <div className="formWrapper">
    <div className="customerFormPage">
    <div className="newCustomerForm">
      <div className='createTitle'>
        <h5>Create a New Customer</h5>
      </div>
      <Container>
    <form onSubmit={handleSubmit}>
    <Container>
  <Row>
    <Col xs={2}><div>
<label className="cusName">Customer Name :</label></div>
</Col>
    <Col xs={4}>            
            <div  style={{marginLeft:'-15%'}}>
            <input className="inputField"
            value={name}
            onChange={e => setName(e.target.value)}
            type="text"
            name="contact_name"
            autoComplete="off"
            placeholder="Customer Name"
          ></input>
              </div> </Col>
    <Col xs={2}><div><label className="cusName">Organization Name :</label></div></Col>
    <Col xs={4}>  
       <div style={{marginLeft:'-10%'}}>
       <input
          className="inputField"
          value={orgName}
          onChange={e => setOrgName(e.target.value)}
          type="text"
          name="org_name"
          autoComplete="off"
          placeholder="Organization"
        /></div> </Col>
  </Row>
  <Row>
    <Col xs={2}><div><label className="cusName">Customer Email :</label></div></Col>
    <Col xs={4}>  
    <div  style={{marginLeft:'-15%'}}>
        <input
          className="inputField"
          value={Email}
          onChange={e => setEmail(e.target.value)}
          type="text"
          name="org_name"
          autoComplete="off"
          placeholder="Email address"
        /></div></Col>
    <Col xs={2}><div><label className="cusName">Customer Phone :</label></div></Col>
    <Col xs={4}>  
    <div  style={{marginLeft:'-10%'}}><input
          className="inputField"
          value={Phone}
          onChange={e => setPhone(e.target.value)}
          type="text"
          name="org_name"
          autoComplete="off"
          placeholder="Phone number" /></div></Col>

  </Row>

  <Row>
    <Col xs={4}><div><label className="cusName">Customer Status :</label></div></Col>
    <Col xs={2} style={{marginLeft:'-21%'}}>  <div>
        <select className="inputField" 
        onChange={e => setStatus(e.target.value)} defaultValue="Customer Status">
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Inactive">Inactive</option>
        </select>   
        </div></Col>
    {/* <Col>3 of 3</Col> */}
  </Row>


  {/* <Row>
    <Col>3</Col>
    <Col>2 of 3</Col>
    <Col>3 of 3</Col>
  </Row>
  <Row>
    <Col>3</Col>
    <Col>2 of 3</Col>
    <Col>3 of 3</Col>
  </Row>
  <Row>
    <Col>3</Col>
    <Col>2 of 3</Col>
    <Col>3 of 3</Col>
  </Row> */}
</Container>
       
    
 
      
        
      
                
        <div style={{textAlign: "center"}}>
        <Button
        type="submit" variant="success">
          Create Customer
        </Button>
        </div>
    
    </form>
    </Container>
    </div>
    </div>
    </div>
  );
}

export default Registration;

