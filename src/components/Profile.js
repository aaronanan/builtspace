import React, { useState, useEffect } from "react";
import axios from 'axios';
import Order from './Order'
import awsconfig from '../aws-exports';
import { Link } from "react-router-dom";
import { access_token, URL } from "../aws-token" 
import "../styles/Profile.css";
import { TextField, Button } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

// const URL = awsconfig.aws_cloud_logic_custom[0].endpoint;
// TODO: Add more customer info fields, add axios.post request to update customer info

function Profile(props) {
  let customer_id = parseInt(props.location.pathname.replace( /^\D+/g, ''))

  const [customer, setCustomer] = useState([]);
  const [numUrls, setNumUrls] = useState(256);
  const [open, setOpen] = useState(false);

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

  function postOrder(){
    const confirmOrder = window.confirm(`Generate ${numUrls} URLs?`)
    if (confirmOrder == true) {
      setOpen(true)
      axios.post(URL + '/orders', 
        {
          customer_id: customer_id,
          order_size: numUrls,
        })
      .then(function (response) {
        console.log(response);
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  const customers_list = customer.map((customer, index) => (
    <>
    <div className="container-fluid" key={index}>
      <div className="row" key={index}>

        <div className="col-md-3 cus_details mg-20 profile-sidebar" style={{maxWidth:"380px", marginBottom:"20px"}}>
          <div className="row">
            <div className="col-12">
              <p className="font-weight-bold profile-header">Customer Details</p>
              <hr className="hr-line" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-5">
              <p className="profile-info" style={{fontSize:"14px"}}>Org Name:</p>
            </div>
            <div className="col-md-6 profile-value">
              {customer.cus_org_name ? customer.cus_org_name : "Loading.."}
            </div>
          </div>
          <div className="row">
            <div className="col-md-5">
              <p className="profile-info" style={{fontSize:"14px"}}>Customer ID:</p>
            </div>
            <div className="col-md-6 profile-value">
              {customer.customer_id ? customer.customer_id : "Loading.."}
            </div>
          </div>
          <div className="row">
            <div className="col-md-5">
              <p className="profile-info" style={{fontSize:"14px"}}>Template:</p>
            </div>
            <div className="col-md-6 profile-value">
              {customer.cus_design ? customer.cus_design : "Loading.."}
            </div>
          </div>
         
        <div className="row">
          <div className="col-12">
            <p className="font-weight-bold profile-header">Contact</p>
            <hr className="hr-line" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-5">
            <p className="profile-info">Name:</p>
          </div>
          <div className="col-md-6 profile-value">
            {customer.cus_contact.c_name ? customer.cus_contact.c_name : "Loading.."}
          </div>
        </div>
        <div className="row">
          <div className="col-md-5">
            <p className="profile-info">Email:</p>
          </div>
          <div className="col-md-6 profile-value">
            {customer.cus_contact.c_email ? customer.cus_contact.c_email : "Loading.."}
          </div>
        </div>
        <div className="row">
          <div className="col-md-5">
            <p className="profile-info">Phone:</p>
          </div>
          <div className="col-md-6 profile-value">
            {customer.cus_contact.c_phone ? customer.cus_contact.c_phone : "Loading.."}
          </div>
        </div>
        <div className="row">
            <div className="col-12">
              <p className="font-weight-bold profile-header">Shipping</p>
              <hr className="hr-line" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-5">
              <p className="profile-info">Address:</p>
            </div>
            <div className="col-md-6 profile-value">
              {customer.cus_shipping.address ? customer.cus_shipping.address : "Loading.."}
            </div>
          </div>
          <div className="row">
            <div className="col-md-5">
              <p className="profile-info">City:</p>
            </div>
            <div className="col-md-6 profile-value">
              {customer.cus_shipping.city ? customer.cus_shipping.city : "Loading.."}
            </div>
          </div>
          <div className="row">
            <div className="col-md-5">
              <p className="profile-info">Prov/State:</p>
            </div>
            <div className="col-md-6 profile-value">
              {customer.cus_shipping.province ? customer.cus_shipping.province : "Loading.."}
            </div>
          </div>
          <div className="row">
            <div className="col-md-5">
              <p className="profile-info">Postal Code:</p>
            </div>
            <div className="col-md-6 profile-value">
              {customer.cus_shipping.post ? customer.cus_shipping.post : "Loading.."}
          </div>
        </div>
        <div className="row">
          <div className="col-md-5">
            <p className="profile-info">Country</p>
          </div>
          <div className="col-md-6 profile-value">
            {customer.cus_shipping.country ? customer.cus_shipping.country : "Loading.."}
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <p className="font-weight-bold profile-header">Sales Contact</p>
            <hr className="hr-line" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-5">
            <p className="profile-info">Name:</p>
          </div>
          <div className="col-md-6 profile-value">
            {customer.sales_contact.s_name ? customer.sales_contact.s_name : "Loading.."}
          </div>
        </div>
        <div className="row">
          <div className="col-md-5">
            <p className="profile-info">Emp. ID:</p>
          </div>
          <div className="col-md-6 profile-value">
            {customer.partner_id ? customer.partner_id : "Loading.."}
          </div>
        </div>
          <div className="row">
            <div className="col-md-5">
              <p className="profile-info">Email:</p>
            </div>
            <div className="col-md-6 profile-value">
              {customer.sales_contact.s_email ? customer.sales_contact.s_email : "Loading.."}
            </div>
          </div>
          </div>

          <div className="col-md-9 order_div" key={index} style={{marginTop:"10px"}}>
          <Backdrop id="backdrop" open={open}>
            <CircularProgress color="inherit" />
          </Backdrop>
            <div className="row">
              <div className="container-fluid">
                  <div style={{textAlign:"center", marginBottom:"20px"}}> 
                    <TextField type="number" onChange={(e)=>{setNumUrls(e.target.value)}} label="Quantity of URLs" defaultValue="256" variant="outlined" inputProps={{
                      style: {
                        height: "45px",
                        // width: "100px",
                        padding: '0 14px',
                      },
                    }}/>
                    <Button onClick={postOrder} variant="outlined" color="primary" style={{height:"45px", backgroundColor:"#00B060", color:"white"}}>Create Order</Button> 
                  </div>
                <Order customer_id={customer_id} />
              </div>
            </div>
            {/* <div className="row">
              <div className="col"></div>
              <div className="col">
              <Link to={{
                pathname: `/create_order/${customer.customer_id}`,
                query: { customer_id: `${customer.customer_id}` }
              }} className="btn btn-md btn-primary btn-profile">New Order</Link>
              </div>
            <div className="col"></div>
          </div> */}
        </div>
        </div>
          
      </div>

    </>
    ));

  return (
      <div style={{marginTop:"18px"}}>
      {customers_list}
      </div>
  );
}

export default Profile;