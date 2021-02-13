import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import awsconfig from '../aws-exports';


const axios = require('axios').default;

// TODO: Display URLs for a specific order on this page, requires new //GET /orders/order_id endpoint, could make the Order ID a link to URL list

function Orders(props) {

    const [orders, setOrders] = useState([0]);
    let search = ""
    const URL = awsconfig.aws_cloud_logic_custom[0].endpoint;


    useEffect(getOrders, []);

    const orders_list = (
      <>
      <br></br>
      <div className="row">

      <div className="col"></div>
      <div className="col-11">
        <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div class="input-group input-group-md mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-sm">Search</span>
                </div>
                <input onChange={handleChange} type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"></input>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
          <Table size="sm" striped bordered hover>
          <thead className="thead-green">
            <tr>
              <th className="text-center">Customer ID</th>
              <th className="text-center">Status</th>
              <th className="text-center">Amount of URLs</th>
              <th className="text-center">Date Created</th>
              <th className="text-center">Order ID</th>
            </tr>
          </thead>
          <tbody>
          {orders.map(order =>
        
              <tr>
                <td className="text-center">{String(order.customer_id).padStart(4, '0')}</td>
                <td className="text-center">{order.status}</td>
                <td className="text-center">{order.num_urls}</td>
                <td className="text-center">{String(order.creation_date).slice(0, 10)}</td>
                <td className="text-center" id="order_id">{order.order_id}</td>
              </tr>
          )}
          </tbody>
          </Table>

          </div>
        </div>
        </div>

      </div>
      <div className="col"></div>
      </div>
    </>
    );

    function getOrders() {
        axios.get(URL + '/orders')
        .then(function (response) {
          const newOrders = response.data.Items
          let filteredOrders = []
          if (search !== ""){
            newOrders.forEach(element => {
              if (parseInt(element.customer_id) === parseInt(search)){
                filteredOrders.push(element)
              }
            }); 
            if (filteredOrders.length === 0){
              filteredOrders.push({customer_id:"No match found"})
            }
          } else {
            filteredOrders = newOrders
          }
          setOrders(filteredOrders);
          // console.log(newOrders);
          // setMessage(newOrders[0].message)
          return response.data.Items
        })
        .catch(function (error) {
          console.log(error);
        });
    };
     function handleChange(e){
       search = e.target.value
       getOrders()
     }
  return (
      <div>
        {orders_list}
      </div>
  );
}

export default Orders;