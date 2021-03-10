import React, { useState, useEffect } from "react";
import axios from 'axios';
import awsconfig from '../aws-exports';

// const axios = require('axios').default;

// const URL = awsconfig.aws_cloud_logic_custom[0].endpoint;

// TODO: Display URLs for a specific order on this page, requires new //GET /orders/order_id endpoint, could make the Order ID a link to URL list

function Orders() {
  
  const [customers, setCustomers] = useState([0])
  const [orders, setOrders] = useState([0])
  const [mergedOrders, setMergedOrders] = useState([0])
  const [filteredOrders, setFilteredOrders] = useState([0])
  const [search, setSearch] = useState("")

  useEffect(getCustomers, [])
  useEffect(getOrders, [])
  useEffect(mergeCustomerOrder, [orders])
  useEffect(sortOrders, [search])

  function getCustomers() {
    axios.get(URL + '/customers')
    .then(function (response) {
      const dbCustomers = response.data.Items
      setCustomers(dbCustomers)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  function getOrders() {
    axios.get(URL + '/orders')
    .then(function (response) {
      const dbOrders = response.data.Items
      setOrders(dbOrders)
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  function mergeCustomerOrder() {
    let customerIDs = customers.map((cusItem) => {
      return cusItem['customer_id']
    })
    let mergedListOfDict = []
    for (let orderItem of orders) {
      if (customerIDs.includes(orderItem.customer_id)) {
        let customerDict = customers[customerIDs.indexOf(orderItem.customer_id)]
        let ordCusDict = Object.assign({}, orderItem, customerDict)
        mergedListOfDict.push(ordCusDict)
      }
    }
    setMergedOrders(mergedListOfDict)
    setFilteredOrders(mergedListOfDict)
  }

  function sortOrders(){
    let newFilteredOrders = []
    if (search !== ""){
      mergedOrders.forEach(element => {
        if (element.customer_id.toString().padStart(4, '0').includes(search) || 
          element.order_id.toString().includes(search) || 
          element.org_name.toUpperCase().includes(search) ){
          newFilteredOrders.push(element)
        }
      }); 
      if (newFilteredOrders.length === 0){
        newFilteredOrders.push({customer_id:"No match found"})
      }
    } else {
      newFilteredOrders = mergedOrders
    }
    setFilteredOrders(newFilteredOrders);
  }
  
  function handleChange(e){
    setSearch(e.target.value.toString().toUpperCase())
  }

  const orders_list = (
    <div>
      <br></br>
      <div className="row">
        <div className="col"></div>
        <div className="col-11">
          <div className="container-fluid">

            <div className="row">
              <div className="col-12">
                <div className="input-group input-group-md mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-sm">Search</span>
                  </div>
                  <input onChange={handleChange} type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Order ID or Customer ID or Organization"></input>
                </div>
              </div>
            </div>

            <br></br>

            <div className="row">
              <div className="col-12">
                <table className="table table-sm table-hover table-striped">
                  <thead className="thead-green">
                    <tr>
                      <th className="text-center">Order ID</th>
                      <th className="text-center">Customer ID</th>
                      <th className="text-center">Organization</th>
                      <th className="text-center"># URLs</th>
                      <th className="text-center">QR Design Code</th>
                      <th className="text-center">Status</th>
                      <th className="text-center">Date Created</th>
                      <th className="text-center">Date Updated</th>
                    </tr>
                  </thead>
                  <tbody>

                  {filteredOrders.map(order =>
                    <tr>
                      <td className="text-center">{order.order_id}</td>
                      <td className="text-center">{String(order.customer_id).padStart(4, '0')}</td>
                      <td className="text-center">{order.org_name}</td>    
                      <td className="text-center">{order.num_urls}</td>
                      <td className="text-center">Link to DB</td>
                      <td className="text-center">{order.status}</td>
                      <td className="text-center">{String(order.creation_date).slice(0, 10)}</td>
                      <td className="text-center">{String(order.lastupdate_date).slice(0, 10)}</td>
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
    </div>
  );
  
  return (
    <>
      { orders_list }
    </>
  );
}

export default Orders;