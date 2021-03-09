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
      setPostalCode("");
      setContactName("");
      setContactEmail("");
      setContactPhone(""); 
    }

  return (
    <>
    <form onSubmit={handleSubmit}>
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
                  <p id="field_title">Organization</p>
                </div>
                <div className="col-7">
                  <input className="form-control"
                  value={orgName}
                  onChange={e => setOrgName(e.target.value)}></input>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="row">
                <div className="col-4">
                  <p id="field_title">Status</p>
                </div>
                <div className="col-7">
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
                <div className="col-4"><p id="field_title">Address</p></div>
                <div className="col-7"><input className="form-control"
                value={address}
                onChange={e => setAddress(e.target.value)}
                  ></input></div>
              </div>
            </div>
            
            <div className="col">
              <div className="row">
                <div className="col-4"><p id="field_title">City</p></div>
                <div className="col-7"><input className="form-control"
                value={city}
                onChange={e => setCity(e.target.value)}></input></div>
              </div>
            </div>

          </div>
          <br></br>
          <div className="row">
            <div className="col">
              <div className="row">
                <div className="col-4"><p id="field_title">State/Province</p></div>
                <div className="col-7"><input className="form-control"
                value={province}
                onChange={e => setProvince(e.target.value)}></input></div>
              </div>
            </div>
            
            <div className="col">
              <div className="row">
                <div className="col-4"><p id="field_title">Country</p></div>
                <div className="col-7"><input className="form-control"
                value={country}
                onChange={e => setCountry(e.target.value)}></input></div>
              </div>
            </div>

          </div>
          <br></br>
          <div className="row">
          <div className="col">
              <div className="row">
                <div className="col-4"><p id="field_title">Contact Name</p></div>
                <div className="col-7"><input className="form-control"
                value={ContactName}
                onChange={e => setContactName(e.target.value)}></input></div>
              </div>
            </div>
            
            <div className="col">
              <div className="row">
                <div className="col-4"><p id="field_title">Postal Code</p></div>
                <div className="col-7"><input className="form-control"
                value={postalCode}
                onChange={e => setPostalCode(e.target.value)}
                ></input></div>
              </div>
            </div>


          </div>
          <br></br>
          <div className="row">
          <div className="col">
              <div className="row">
                <div className="col-4"><p id="field_title">Email</p></div>
                <div className="col-7"><input className="form-control"
                value={ContactEmail}
                onChange={e => setContactEmail(e.target.value)}
                ></input></div>
              </div>
            </div>
            
            <div className="col">
              <div className="row">
                <div className="col-4"><p id="field_title"> Contact Phone</p></div>
                <div className="col-7"><input className="form-control"
                value={ContactPhone}
                onChange={e => setContactPhone(e.target.value)}></input></div>
              </div>
            </div>


          </div>
          <br></br>
          <br></br>
          <div className="row">
          <div className="col text-center">
          <Button className="btn btn-success" type="submit">
            Create Customer
          </Button>
        </div>
            {/* <div className="col text-center">
              <a className="btn btn-md btn-primary btn-theme-form" >Create</a>
            </div> */}
            
            <div className="col-5">
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

