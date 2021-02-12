import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import awsconfig from '../aws-exports';


const axios = require('axios').default;

// TODO: Display URLs for a specific order on this page, requires new //GET /orders/order_id endpoint, could make the Order ID a link to URL list

function Orders(props) {

    const [orders, setOrders] = useState([0]);
    const URL = awsconfig.aws_cloud_logic_custom[0].endpoint;


    useEffect(getOrders, []);

    const orders_list = (
      <>
      <br></br>
      <div className="row">

      <div className="col"></div>
      <div className="col-11">
        <div className="container-fluid overflow-scroll">
        <div className="row">
          <div className="col-6">
            <div class="input-group input-group-md mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-sm">Search</span>
                </div>
                <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"></input>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
          <Table size="sm" striped bordered hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer ID</th>
              <th>Organization</th>
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
              <td>{String(order.customer_id).padStart(4, '0')}</td>
              <td>TODO link to db</td>
              <td>{order.num_urls}</td>
              <td>{order.status}</td>
              <td>{String(order.creation_date).slice(0, 10)}</td>
              <td>{String(order.lastupdate_date).slice(0, 10)}</td>
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

  return (
      <div>
        {orders_list}
      </div>
  );
}

export default Orders;