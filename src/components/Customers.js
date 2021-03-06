import React, { useState, useEffect } from "react";
import axios from 'axios';
import awsconfig from '../aws-exports';
import { Link } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';
import "../styles/Customers.css";

const URL = awsconfig.aws_cloud_logic_custom[0].endpoint;

function Customers() {

  const [customers, setCustomers] = useState([0]);
  const [filteredCustomers, setFilteredCustomers] = useState([0]);
  const [search, setSearch] = useState("");

  useEffect(getCustomers, [])
  useEffect(sortCustomers, [search])

  function getCustomers() {
    const access_token = 'u7XAWyOamG8uP6qcW4PtfaXhFJXEXNTX6lqE3NGR'
    axios.get(URL + '/customers' , {
      headers: {
        'x-api-key': `${access_token}`
      }
    })
    .then(function (response) {
      const dbCustomers = response.data.Items
      setCustomers(dbCustomers)
      setFilteredCustomers(dbCustomers)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  function sortCustomers() {
    let newFilteredCustomers = []
    if (search !== ""){
      customers.forEach(element => {
          if (element.customer_id.toString().padStart(4, '0').includes(search) || element.org_name.toUpperCase().includes(search) ) {
            newFilteredCustomers.push(element);
          }
      });
      if (newFilteredCustomers.length === 0){
        newFilteredCustomers.push({customer_id:"No match found"})
      }
    } else {
      newFilteredCustomers = customers;
    }
    setFilteredCustomers(newFilteredCustomers);
  }

  function handleChange(e){
    setSearch(e.target.value.toString().toUpperCase())
  }

  const customers_list = (
    <div className="container">
      <br></br>
      
      <div className="row justify-content-center">
        <div className="col-9">
          <div className="input-group input-group-md mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-sm">Search</span>
            </div>
            <input onChange={handleChange} type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="ID or Organization"></input>
          </div>
        </div>
        <div className="col-3">
          <LinkContainer to="/new_customer">
            <a className="btn btn-primary  btn-theme">Create a New Customer</a>
          </LinkContainer>
        </div>
      </div>

      <br></br>

      <div className="row justify-content-center">
        <div className="col-12">
          <table className="table table-sm table-hover table-striped">
            <thead className="thead-green">
              <tr>
                <th className="text-center left_radius">ID</th>
                <th className="text-center">Organization</th>
                <th className="text-center">Status</th>
                <th className="text-center">More Info</th>
                <th className="text-center right_radius">New Order</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map(customer => 
                <tr>
                  <td className="text-center" id="customer_id">{String(customer.customer_id).padStart(4, '0')}</td>
                  <td className="text-center" id="name">{customer.org_name}</td>
                  <td className="text-center" id="email">{customer.cus_status}</td>
                  <td className="text-center"><Link to={{
                    pathname: `/profile`,
                    query: { customer_id: `${customer.customer_id}` }
                    }} className="btn btn-secondary btn-sm btn-middle">Orders and More Info</Link></td>
                  <td className="text-center" id="submitOrder"><Link to={{
                    pathname: `/create_order/${customer.customer_id}`,
                    query: { customer_id: `${customer.customer_id}` }
                    }} className="btn btn-sm btn-primary btn-theme btn-middle">Submit an Order</Link></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )

  return (
    <>
      { customers_list }
    </>
  );
}


export default Customers;


// function sortCustomers(){
//   var i;
//   if (deactivatedCustomers <= 0){
//   for(i=0; i< customers.length; i++) {
//     if(customers[i].cus_status === "Inactive") {
//       deactivatedCustomers.push(customers[i]);
//       delete customers[i];
//     }
//    }
//   }
// }