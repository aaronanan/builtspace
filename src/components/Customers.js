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
    let search = ""

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

  function getCustomers() {
    axios.get(URL + '/customers')
    .then(function (response) {
      // console.log(response.data.Items);
      let filteredCustomers = []
      const newCustomers = response.data.Items
      if (search !== ""){
        newCustomers.forEach(element => {
          if (element.org_name === search) {
            filteredCustomers.push(element);
          }
        });
        // if (filteredCustomers.length === 0){
        //   filteredCustomers.push({org_name: "No Match Found!"})
        // }
      } else {
        filteredCustomers = newCustomers;
      }
      setCustomers(filteredCustomers);
      return response.data.Items
    })
    .catch(function (error) {
      console.log(error);
    });
  }

    useEffect(getCustomers, []);

    const customer_table = (
      <table className="table table-sm table-hover table-striped">
      <thead className="thead-green">
        <tr>
          <th className="text-center">ID</th>
          <th className="text-center">Organization</th>
          <th className="text-center">Status</th>
          <th className="text-center">More Info</th>
          <th className="text-center">New Order</th>
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
          <td  className="text-center" id="customer_id">{String(customer.customer_id).padStart(4, '0')}</td>
          <td className="text-center" id="name">{customer.org_name}</td>
          <td className="text-center" id="email">{customer.cus_status}</td>
          <td className="text-center"><Link to={{
            pathname: `/profile`,
            query: { customer_id: `${customer.customer_id}` }
          }} className="btn btn-secondary btn-sm btn-middle">Orders and More Info</Link>
          </td>
          <td className="text-center" id="submitOrder"><Link to={{
            pathname: `/create_order/${customer.customer_id}`,
            query: { customer_id: `${customer.customer_id}` }
          }} className="btn btn-sm btn-primary btn-theme btn-middle">Submit an Order</Link></td>
        </tr>
      )}
      </tbody>
      </table>
    )
    function handleChange(e){
      search = e.target.value;
      getCustomers();
    }
    sortCustomers();
    return (
      <>
      <div className="container">
        <br></br>
        <div className="row justify-content-center">
          <div className="col-sm-9">
          <div className="input-group input-group-md mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-sm">Search</span>
            </div>
            <input onChange={handleChange} type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"></input>
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