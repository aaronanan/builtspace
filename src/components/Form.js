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
    </div>
    </div>
    </div>
  );
}

export default Form;

