import React, { useState, useEffect } from "react";
import axios from 'axios';
import Order from './Order'
import awsconfig from '../aws-exports';
import { Link } from "react-router-dom";
// import "../styles/Profile.css";



// TODO: Add more customer info fields, add axios.post request to update customer info

function Profile(props) {
    let customer_id = 4

    if ("query" in props.location) {
      customer_id = parseInt(props.location.query.customer_id);
    } 

    
    useEffect(() => {
      console.log(props)
    }, []);
    const [customers, setCustomers] = useState([0]);
    const URL = awsconfig.aws_cloud_logic_custom[0].endpoint;
    const [conName, setContactName] = useState([0]);
    const [email, setContactEmail] = useState([0]);
    const [phone, setContactPhone] = useState([0]);
    const [address, setAddress] = useState([0]);
    const [city, setCity] = useState([0]);
    const [prov, setProv] = useState([0]);
    const [postal, SetPostal] = useState([0]);
    const [country, setCountry] = useState([0]);
    const [empName, setEmpName] = useState([0]);
    const [empEmail, setEmpEmail] = useState([0]);
    // let [org_name,address,city,prov,postalcode,country,name,email,phone] = ["","","","","","","","",""]

    useEffect(() => {
      setCustomers([0]);
    }, []);

    useEffect(()=> {
    axios.get(URL + '/customers/' + customer_id, 
      {
      "customer_id": customer_id 
      })
    .then(function (response) {
      setCustomers([response.data.Item]);
      console.log(response.data.Item)
      setAddress([response.data.Item.ship_address.Address]);
      setCity([response.data.Item.ship_address.City]);
      setProv([response.data.Item.ship_address.prov]);
      SetPostal([response.data.Item.ship_address.post_code]);
      setCountry([response.data.Item.ship_address.country]);
      setContactName([response.data.Item.contact_name]);
      setContactEmail([response.data.Item.contact_person.email]);
      setContactPhone([response.data.Item.contact_person.phone]);
      setEmpName([response.data.Item.partner_contact.name])
      setEmpEmail([response.data.Item.partner_contact.email])
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
  }, [])
    const customers_list = customers.map(customer => (
      <>
      <div className="container-fluid mg-20">
        <div className="row mg-20">
          <div className="col-md-3 cus_details mg-20">
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
              {address ? address : "Loading.."}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
              <p>City:</p>
              </div>
              <div className="col-md-6 text-center">
              {city ? city : "Loading.."}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
              <p>Prov/State:</p>
              </div>
              <div className="col-md-6 text-center">
              {prov ? prov : "Loading.."}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
              <p>Postal Code:</p>
              </div>
              <div className="col-md-6 text-center">
              {postal ? postal : "Loading.."}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
              <p>Country</p>
              </div>
              <div className="col-md-6 text-center">
              {country ? country : "Loading.."}
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
              {conName ? conName : "Loading.."}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
              <p>Email:</p>
              </div>
              <div className="col-md-6 text-center">
              {email ? email : "Loading.."}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
              <p>Phone:</p>
              </div>
              <div className="col-md-6 text-center">
              {phone ? phone : "Loading.."}
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
              {empName ? empName : "Loading.."}
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
              {empEmail ? empEmail : "Loading.."}
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