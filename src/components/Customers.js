import React, { useState, useEffect } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { Link } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';
import awsconfig from '../aws-exports';
import "../styles/Customers.css";


// TODO: Add button/option that takes customer ID and displays orders for that ID, instead of having to manually search for customer ID in another page

let deactivatedCustomers = [];


function Customers(props) {

    const URL = awsconfig.aws_cloud_logic_custom[0].endpoint;
    const [customers, setCustomers] = useState([0]);
    const [firstTable, setFirstTable] = useState(true);

    function sortCustomers(){
      var i;
      if (deactivatedCustomers <= 0){
      for(i=0; i< customers.length; i++) {
        if(customers[i].cus_status === "Inactive") {
          deactivatedCustomers.push(customers[i]);
          delete customers[i];
        }
     }
    }
  }

  function filter(arr) {
      for(let i=0; i<arr.length; i++) {
        if(arr[i].cus_status === "Inactive") {
          delete customers[i];
        }
      }
  }

  function getCustomers() {
    axios.get(URL + '/customers')
    .then(function (response) {
      // console.log(response.data.Items);
      const newCustomers = response.data.Items
      filter(newCustomers);
      setCustomers(newCustomers);
      return response.data.Items
    })
    .catch(function (error) {
      console.log(error);
    });
  }

    useEffect(getCustomers, []);

    const customer_table = (
      <table className="table table-sm table-hover table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Organization</th>
          <th>Status</th>
          <th>More Info</th>
          <th>New Order</th>
        </tr>
      </thead>
      <tbody>
      {customers.filter(function(customer) {
          if(customer.cus_status === "Inactive"){
            return false;
          }
          return true;
        }).map(customer => 
        <tr>
          <td id="customer_id">{String(customer.customer_id).padStart(4, '0')}</td>
          <td id="name">{customer.org_name}</td>
          <td id="email">{customer.cus_status}</td>
          <td><Link to={{
            pathname: `/profile/${customer.customer_id}`,
            query: { customer_id: `${customer.customer_id}` }
          }} className="btn btn-secondary btn-sm">Orders and More Info</Link>
          </td>
          <td id="submitOrder"><Link to={{
            pathname: `/create_order/${customer.customer_id}`,
            query: { customer_id: `${customer.customer_id}` }
          }} className="btn btn-sm btn-primary btn-theme">Submit an Order</Link></td>
        </tr>
      )}
      </tbody>
      </table>
    )

    sortCustomers();
    return (
      <>
      <div className="container">
        <br></br>
        <div className="row justify-content-center">
          <div className="col-sm-9">
          <div class="input-group input-group-md mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm">Search</span>
            </div>
            <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"></input>
            </div>
          </div>
          <div className="col-sm-3">
            <LinkContainer to="/new_customer">
              <a className="btn btn-primary  btn-theme">Create a New Customer</a>
            </LinkContainer>
        </div>
        </div>
        <br></br>
        <div className="row justify-content-center">
          <div className="col-12">
            { customer_table }
          </div>
        </div>

      </div>
          
      </>
  );
}


export default Customers;