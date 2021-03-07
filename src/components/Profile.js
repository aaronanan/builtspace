import React, { useState, useEffect } from "react";
import axios from 'axios';
import Order from './Order'
import awsconfig from '../aws-exports';
import { Link } from "react-router-dom";
import { access_token } from "../aws-token" 
// import "../styles/Profile.css";

const URL = awsconfig.aws_cloud_logic_custom[0].endpoint;

// TODO: Add more customer info fields, add axios.post request to update customer info

function Profile(props) {
  let customer_id = parseInt(props.location.pathname.replace( /^\D+/g, ''))

  const [customer, setCustomer] = useState([]);

  useEffect(getCustomers, [])

  function getCustomers () {
    axios.get(URL + '/customers/' + customer_id, {
      headers: {
        'x-api-key': access_token
      }
    })  
    .then(function (response) {
      setCustomer([response.data.Item])
      }
    )
    .catch(function (error) {
      console.log(error);
    });
  }

  const customers_list = customer.map(customer => (
    <>
    <div className="container-fluid mg-20">
      <div className="row mg-20">
        <div className="col-md-3 cus_details mg-20" style={{backgroundColor:"lightgrey"}}>
          <div className="row">
            <div className="col-12 text-center">
              <p className="font-weight-bold">Customer Details</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <p>Org. Name:</p>
            </div>
            <div className="col-md-6 text-center">
              {customer.org_name ? customer.org_name : "Loading.."}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <p>Customer ID:</p>
            </div>
            <div className="col-md-6 text-center">
              {customer.customer_id ? customer.customer_id : "Loading.."}
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center">
              <p className="font-weight-bold">Shipping</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <p>Address:</p>
            </div>
            <div className="col-md-6 text-center">
              {customer.ship_address.Address ? customer.ship_address.Address : "Loading.."}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <p>City:</p>
            </div>
            <div className="col-md-6 text-center">
              {customer.ship_address.City ? customer.ship_address.City : "Loading.."}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <p>Prov/State:</p>
            </div>
            <div className="col-md-6 text-center">
              {customer.ship_address.prov ? customer.ship_address.prov : "Loading.."}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <p>Postal Code:</p>
            </div>
            <div className="col-md-6 text-center">
              {customer.ship_address.post_code ? customer.ship_address.post_code : "Loading.."}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <p>Country</p>
          </div>
          <div className="col-md-6 text-center">
            {customer.ship_address.country ? customer.ship_address.country : "Loading.."}
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <p className="font-weight-bold">Contact</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <p>Name:</p>
          </div>
          <div className="col-md-6 text-center">
            {customer.contact_name ? customer.contact_name : "Loading.."}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <p>Email:</p>
          </div>
          <div className="col-md-6 text-center">
            {customer.contact_person.email ? customer.contact_person.email : "Loading.."}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <p>Phone:</p>
          </div>
          <div className="col-md-6 text-center">
            {customer.contact_person.phone ? customer.contact_person.phone : "Loading.."}
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <p className="font-weight-bold">BuiltSpace Sales Contact</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <p>Name:</p>
          </div>
          <div className="col-md-6 text-center">
            {customer.sales_contact.name ? customer.sales_contact.name : "Loading.."}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <p>Emp. ID:</p>
          </div>
          <div className="col-md-6 text-center">
            {customer.partner_id ? customer.partner_id : "Loading.."}
          </div>
        </div>
          <div className="row">
            <div className="col-md-6">
              <p>Email:</p>
            </div>
            <div className="col-md-6 text-center">
              {customer.sales_contact.email ? customer.sales_contact.email : "Loading.."}
            </div>
          </div>
              {/* <div className="col">
            <p className="font-weight-bold">Customer Details</p>
            <p>Org. Name:</p>
            <p>Customer ID:</p>
            <br></br>
            <p className="font-weight-bold">Shipping</p>
            <p>Address: </p>
            <p>City:</p>
            <p>Prov/State: </p>
            <p>Postal Code: </p>
            <p>Country: </p>
            <br></br>
            <p className="font-weight-bold">Contact</p>
            <p>Name: </p>
            <p>Email:</p>
            <p>Phone: </p>
            <p className="font-weight-bold">BuiltSpace Sales Contact</p>
            <p>Name: </p>
            <p>Emp ID: </p>
            <p>Email: </p>
              </div>
              <div className="col">
              <p> '</p>
              <p>{customer.org_name}</p>
              <p>{customer.customer_id}</p>
              <br></br>
              <p className="font-weight-bold">'</p>
              <p>TEMP</p>
              <p>TEMP</p>
              <p>TEMP</p>
              <p>TEMP</p>
              <p>TEMP</p>
              <br></br>
              <p className="font-weight-bold">'</p>
              <p>TEMP</p>
              <p>TEMP</p>
              <p>PTEMP</p>
              <p className="font-weight-bold">'</p>
              <p>TEMP</p>
              <p>Emp ID:</p>
              <p>Email:</p>
            </div> */}
            
          </div>

          <div className="col-md-9 order_div">
            <div className="row">
              <div className="container-fluid ord_table">
                <Order customer_id={customer_id} />
              </div>
            </div>
            <div className="row">
              <div className="col"></div>
              <div className="col">
              <Link to={{
                pathname: `/create_order/${customer.customer_id}`,
                query: { customer_id: `${customer.customer_id}` }
              }} className="btn btn-md btn-primary btn-profile">New Order</Link>
              </div>
            <div className="col"></div>
          </div>
        </div>
          
      </div>
    </div>

    </>
    ));

  return (
      <>
      {customers_list}
      </>
  );
}

export default Profile;