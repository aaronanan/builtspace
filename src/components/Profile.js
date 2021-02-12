import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import awsconfig from '../aws-exports';


const axios = require('axios').default;

// TODO: Add more customer info fields, add axios.post request to update customer info

function Profile(props) {

  var customer_id = parseInt(props.location.query.customer_id);
  // console.log(customer_id);
  
  const [orders, setOrders] = useState([0]);
  const [customers, setCustomers] = useState([0]);
  const URL = awsconfig.aws_cloud_logic_custom[0].endpoint;

  useEffect(getOrders, []);
  useEffect(getCustomers, []);
  console.log(customers)

  const getCustomer = (x) => {
    for (let item of customers) {
      if (item.customer_id == x ) {
        return item
      }
    }
  }

  const customer = getCustomer(customer_id)
  console.log("hello world",customer)

  const customer_details = (
    <>  
      {/* <el>{customer.org_name}</el> */}
      <div className="d-flex flex-column pt-2 justify-content-center">
        <div className="p-2"><h3>Organization</h3></div>
        <div className="p-2"><h4>Customer ID</h4></div>
      </div>

      <div>
        <li>
          <ul><b>Shipping</b></ul>
          <ul>Address:</ul>
          <ul>City:</ul>
          <ul>Prov/State:</ul>
          <ul>Postal code:</ul>
          <ul>Country:</ul>
        </li>
      </div>

      <div>
        <li>
          <ul><b>Contact</b></ul>
          <ul>Name:</ul>
          <ul>Email:</ul>
          <ul>Phone:</ul>
        </li>
      </div>

      <div>
        <li>
          <ul><b>BuiltSpace sales contact</b></ul>
          <ul>Name:</ul>
          <ul>Employee ID:</ul>
          <ul>Email:</ul>
        </li>
      </div>
    </>
  )

  const orders_list = (
    <>
    <br></br>
    <div className="row">

    <div className="col"></div>
    <div className="col-11">
      <div className="container-fluid">
      <div className="row">
        <div className="col">
          <div class="input-group input-group-md mb-3 pb-4">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-sm">Search</span>
              </div>
              <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"></input>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
        <table className="table table-sm table-hover table-striped">
        <thead>
          <tr>
            <th>Order ID</th>
            <th># URLs</th>
            <th>Status</th>
            <th>Date Created</th>
            <th>Date Updated</th>
          </tr>
        </thead>
        <tbody>
        {orders.map(order =>
          <tr>
            <td id="order_id">{order.order_id}</td>
            <td>{order.num_urls}</td>
            <td>{order.status}</td>
            <td>{String(order.creation_date).slice(0, 10)}</td>
            <td>{String(order.lastupdate_date).slice(0, 10)}</td>
          </tr>
        )}
        </tbody>
        </table>

        </div>
      </div>
      </div>

    </div>
    <div className="col"></div>
    </div>
  </>
  );



  // axios.get(URL + '/customers/' + customer_id)
  // .then(function (response) {
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });
  

  function getOrders() {
    axios.get(URL + '/orders')
    .then(function (response) {
      // console.log(response.data.Items);
      const newOrders = response.data.Items
      setOrders(newOrders);
      // console.log(newOrders);
      // setMessage(newOrders[0].message)
      return response.data.Items
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  function getCustomers() {
    axios.get(URL + '/customers')
    .then(function (response) {
      // console.log(response.data.Items);
      const newCustomers = response.data.Items
      setCustomers(newCustomers);
      return response.data.Items
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  return (
    <div className="container-fluid">
      <div>
        <div className="row">
          <div className="col-3 bg-success px-2 rounded">
            { customer_details }
          </div>
          <div className="col">
            { orders_list }
          </div>
        </div>
      </div>
    </div>

  );
}



export default Profile;