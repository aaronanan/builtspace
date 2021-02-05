import React, { useState, useEffect } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { Link } from "react-router-dom";
import awsconfig from '../aws-exports';

// TODO: Add button/option that takes customer ID and displays orders for that ID, instead of having to manually search for customer ID in another page

let deactivatedCustomers = [];


function Customers(props) {

    const URL = awsconfig.aws_cloud_logic_custom[0].endpoint;
    const [customers, setCustomers] = useState([0]);
    const [firstTable, setFirstTable] = useState(true);

    function sortCustomers(){
      var i;
      console.log()
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
      <Table size="sm" striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Customer Name</th>
          <th>Organization</th>
          <th>Status</th>
          <th>More Info</th>
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
          <td id="name">{customer.contact_name}</td>
          <td id="name">{customer.org_name}</td>
          <td id="email">{customer.cus_status}</td>
          <td><Link to={{
            pathname: `/profile/${customer.customer_id}`,
            query: { customer_id: `${customer.customer_id}` }
          }} className="btn btn-secondary btn-sm">Profile</Link></td>
        </tr>
      )}
      </tbody>
    </Table>
    )


    const deactivatedCustomer_table = (
      <Table size="sm" striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Customer Name</th>
          <th>Organization</th>
          <th>Status</th>
          <th>More Info</th>
        </tr>
      </thead>
      <tbody>
      {deactivatedCustomers.map(customer => 
        <tr>
          <td id="customer_id">{String(customer.customer_id).padStart(4, '0')}</td>
          <td id="name">{customer.contact_name}</td>
          <td id="name">{customer.org_name}</td>
          <td id="email">{customer.cus_status}</td>
          <td><Link to={{
            pathname: `/profile/${customer.customer_id}`,
            query: { customer_id: `${customer.customer_id}`}
          }} className="btn btn-secondary btn-sm">Profile</Link></td>
    
        </tr>
      )}
      </tbody>
    </Table>
    )

    sortCustomers();
    return (
          <div>
            <div className="toggleCustomers">
            <Button variant="danger" className="toggleButton"
            onClick={() => setFirstTable(!firstTable)} >Toggle Inactive Customers</Button>
            </div>
          { firstTable ? customer_table: deactivatedCustomer_table }
          </div>
  );
}


export default Customers;