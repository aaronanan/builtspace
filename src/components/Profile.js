import React, { useState, useEffect } from "react";
import axios from 'axios';
import Order from './Order'
import awsconfig from '../aws-exports';
import { Link } from "react-router-dom";
import "../styles/Profile.css";



// TODO: Add more customer info fields, add axios.post request to update customer info

function Profile(props) {
    let customer_id = parseInt(props.location.query.customer_id);
    const [customers, setCustomers] = useState([0]);
    const URL = awsconfig.aws_cloud_logic_custom[0].endpoint;

    // let [org_name,address,city,prov,postalcode,country,name,email,phone] = ["","","","","","","","",""]

    useEffect(() => {
      setCustomers([0]);
    }, []);

    axios.get(URL + '/customers/' + customer_id, 
      {
      "customer_id": customer_id 
      })
    .then(function (response) {
      setCustomers([response.data.Item])
      // console.log(customers[0])

        // let org_name = response.data.Item.contact_name
        // let name= response.data.Item.contact_name
        // let email = response.data.Item.contact_person.email
        // let phone = response.data.Item.contact_person.phone
        // let address = response.data.Item.ship_address.Address
        // let ity = response.data.Item.ship_address.City
        // let country = response.data.Item.ship_address.country
        // let postalcode = response.data.Item.ship_address.post_code
        // let prov = response.data.Item.ship_address.prov
        
      }
      )
    .catch(function (error) {
      console.log(error);
    });
    const customers_list = customers.map(customer => (
      <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-3 cus_details">
            <div className="row">
              <div className="col">
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
            {/* <p>Emp ID: {customer.partner_id}</p>
            <p>Email: {customer.partner_contact}</p> */}
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
              {/* <p>Emp ID: {customer.partner_id}</p>
              <p>Email: {customer.partner_contact}</p> */}
              </div>
            </div>
          </div>
          <div className="col-9 order_div">
            <div className="row">
              <div className="container-fluid ord_table">
              <Order
              customer_id={customer_id} />
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