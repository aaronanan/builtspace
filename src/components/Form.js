import React, { useState } from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import awsconfig from '../aws-exports';


// TODO: Store multiple values in one state instead of having state for each field
// This form currently accepts input for Organization, Customer Name and Status and passes the rest of the data fields as blank/null




function Form(props) {

  const URL = awsconfig.aws_cloud_logic_custom[0].endpoint;

  const [name, setName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [status, setStatus] = useState("Active");

    
    function handleSubmit(e) {
        e.preventDefault();
      axios.post(URL + '/customers', {
        "org_name": orgName,
        "cus_status": status,
        "contact_name": name, 
        "ship_address": {
          "Address": "dasfadsf",
          "City": "sadfasdf",
          "prov": "adsfasdf",
          "post_code": "",
          "country": ""
        },
        "pref_des": "dfadf",
        "org_id": "fadf",
        "serial_prefix": "",
        "contact_person": {
          "email": "",
          "phone": ""
        },
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
      })
      .catch(function (error) {
        console.log(error);
      });
      setName("");
      setOrgName("");
      setStatus(status);
    }

  return (
    <>
    <div className="formWrapper">
    <div className="customerFormPage">
    <div className="newCustomerForm">
      <div>
        <h5>Add a New Customer</h5>
      </div>
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
      </h2>
        <ul>
            <li>
        <input
          className="inputField"
          value={name}
          onChange={e => setName(e.target.value)}
          type="text"
          name="contact_name"
          autoComplete="off"
          placeholder="Customer Name"
        ></input>
        </li>
        <li>
        <input
          className="inputField"
          value={orgName}
          onChange={e => setOrgName(e.target.value)}
          type="text"
          name="org_name"
          autoComplete="off"
          placeholder="Organization"
        />
        </li>
        <li> 
        <label>Customer Status</label>
        <select className="inputField" 
        onChange={e => setStatus(e.target.value)} defaultValue="Customer Status">
          <option value="Active">Active</option>
          <option value="On-Boarding">On-Boarding</option>
          <option value="Inactive">Inactive</option>
        </select>
        </li>
        <div style={{textAlign: "center"}}>
        <Button
        type="submit">
          Create Customer
        </Button>
        </div>
        </ul>
    </form>
    {/* <form>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4">Email</label>
      <input type="email" class="form-control" id="inputEmail4" placeholder="Email"></input>
    </div>
    <div class="form-group col-md-6">
      <label for="inputPassword4">Password</label>
      <input type="password" class="form-control" id="inputPassword4" placeholder="Password"></input>
    </div>
  </div>
  <div class="form-group">
    <label for="inputAddress">Address</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St"></input>
  </div>
  <div class="form-group">
    <label for="inputAddress2">Address 2</label>
    <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"></input>
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputCity">City</label>
      <input type="text" class="form-control" id="inputCity"></input>
    </div>
    <div class="form-group col-md-4">
      <label for="inputState">State</label>
      <select id="inputState" class="form-control">
        <option selected>Choose...</option>
        <option>...</option>
      </select>
    </div>
    <div class="form-group col-md-2">
      <label for="inputZip">Zip</label>
      <input type="text" class="form-control" id="inputZip"></input>
    </div>
  </div>
  <div class="form-group">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="gridCheck">
      <label class="form-check-label" for="gridCheck">
        Check me out
      </label></input>
    </div>
  </div>
  <button type="submit" class="btn btn-primary">Sign in</button>
</form> */}
    </div>
    </div>
    </div>
    </>
  );
}

export default Form;

