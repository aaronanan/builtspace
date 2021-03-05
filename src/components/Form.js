import React, { useState } from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import awsconfig from '../aws-exports';
import "../styles/form.css";

// TODO: Store multiple values in one state instead of having state for each field
// This form currently accepts input for Organization, Customer Name and Status and passes the rest of the data fields as blank/null




function Form(props) {

  const URL = awsconfig.aws_cloud_logic_custom[0].endpoint;

  const [ContactName, setContactName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [status, setStatus] = useState("Active");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [ContactEmail, setContactEmail] = useState("");
  const [ContactPhone, setContactPhone] = useState("");



    
    function handleSubmit(e) {
        e.preventDefault();
      axios.post(URL + '/customers', {
        "org_name": orgName,
        "cus_status": status,
        "contact_name": ContactName, 
        "ship_address": {
          "Address": address,
          "City": city,
          "prov": province,
          "post_code": postalCode,
          "country": country
        },
        "pref_des": "dfadf",
        "org_id": "fadf",
        "serial_prefix": "",
        "contact_person": {
          "email": ContactEmail,
          "phone": ContactPhone
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
      setContactName("");
      setOrgName("");
      setStatus(status);
      setAddress("");
      setCity("");
      setCountry("");
      setProvince("");
    }

  return (
    <>
    <form onSubmit={handleSubmit}>
      {/* <h2 className="label-wrapper">
      </h2>
        <input
          className="inputField"
          value={name}
          onChange={e => setName(e.target.value)}
          type="text"
          name="contact_name"
          autoComplete="off"
          placeholder="Customer Name"
        ></input>
        <input
          className="inputField"
          value={orgName}
          onChange={e => setOrgName(e.target.value)}
          type="text"
          name="org_name"
          autoComplete="off"
          placeholder="Organization"
        ></input>
        <label>Customer Status</label>
        <select className="inputField" 
            onChange={e => setStatus(e.target.value)} defaultValue="Customer Status">
              <option value="Active">Active</option>
              <option value="On-Boarding">On-Boarding</option>
              <option value="Inactive">Inactive</option>
        </select>
        <div style={{textAlign: "center"}}>
          <Button type="submit">
            Create Customer
          </Button>
        </div> */}
        <div className="row">

        <div className="col"></div>
        <div className="col-8">
        <div className="container-fluid">
          <div className="row">
            <div className="col"></div>
            <div className="col-8 text-center"><p className="h2 formLabel">Create a Customer</p></div>
            <div className="col"></div>
          </div>
          <br></br>
          <br></br>
          <div className="row">

            <div className="col">
              <div className="row">
                <div className="col-4">
                  <p>Organization</p>
                </div>
                <div className="col">
                  <input className="form-control"
                  value={orgName}
                  onChange={e => setOrgName(e.target.value)}></input>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="row">
                <div className="col-3">
                  <p>Status</p>
                </div>
                <div className="col">
                  <select className="form-control inputField" 
                    onChange={e => setStatus(e.target.value)} defaultValue="Customer Status">
                    <option value="Active">Active</option>
                    <option value="On-Boarding">On-Boarding</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
            
          </div>
          <br></br>
          <div className="row">
            <div className="col">
              <div className="row">
                <div className="col-3"><p>Address</p></div>
                <div className="col"><input className="form-control"
                value={address}
                onChange={e => setAddress(e.target.value)}
                  ></input></div>
              </div>
            </div>
            
            <div className="col">
              <div className="row">
                <div className="col-3"><p>City</p></div>
                <div className="col"><input className="form-control"
                value={city}
                onChange={e => setCity(e.target.value)}></input></div>
              </div>
            </div>

          </div>
          <br></br>
          <div className="row">
            <div className="col">
              <div className="row">
                <div className="col-4"><p>State/Province</p></div>
                <div className="col"><input className="form-control"></input></div>
              </div>
            </div>
            
            <div className="col">
              <div className="row">
                <div className="col-3"><p>Country</p></div>
                <div className="col"><input className="form-control"></input></div>
              </div>
            </div>

          </div>
          <br></br>
          <div className="row">
          <div className="col">
              <div className="row">
                <div className="col-5"><p>Contact Name</p></div>
                <div className="col"><input className="form-control"></input></div>
              </div>
            </div>
            
            <div className="col">
              <div className="row">
                <div className="col-4"><p>Postal Code</p></div>
                <div className="col"><input className="form-control"></input></div>
              </div>
            </div>


          </div>
          <br></br>
          <div className="row">
          <div className="col">
              <div className="row">
                <div className="col-3">Email</div>
                <div className="col"><input className="form-control"></input></div>
              </div>
            </div>
            
            <div className="col">
              <div className="row">
                <div className="col-5">Contact Phone</div>
                <div className="col"><input className="form-control"></input></div>
              </div>
            </div>


          </div>
          <br></br>
          <br></br>
          <div className="row">
            <div className="col text-center">
              <a className="btn btn-md btn-primary btn-theme-form">Create</a>
            </div>
            
            <div className="col text-center">
              <a className="btn btn-md btn-secondary btn-secondary-form" href="/Customers">Cancel</a>
            </div>

          </div>
        </div>
        </div>
        <div className="col"></div>
        </div>
    </form>
    
    </>
  );
}

export default Form;

