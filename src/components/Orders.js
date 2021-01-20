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
      <Table size="sm" striped bordered hover>
      <thead>
        <tr>
          <th>Customer ID</th>
          <th>Status</th>
          <th>Amount of URLs</th>
          <th>Date Created</th>
          <th>Order ID</th>
        </tr>
      </thead>
      <tbody>
      {orders.map(order =>
        <tr>
          <td>{String(order.customer_id).padStart(4, '0')}</td>
          <td>{order.status}</td>
          <td>{order.num_urls}</td>
          <td>{String(order.creation_date).slice(0, 10)}</td>
          <td id="order_id">{order.order_id}</td>
        </tr>
      )}
      </tbody>
    </Table>
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