import React, { useEffect, useState } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import awsconfig from '../aws-exports';
import CopyToClipboard from 'react-copy-to-clipboard';
import { access_token } from "../aws-token" 

// TODO: Integrate unused Modal code to display URLs for a specific order, requires new //GET /orders/order_id endpoint

const URL = awsconfig.aws_cloud_logic_custom[0].endpoint;

function Order(props) {

  const [orders, setOrders] = useState([0]);

  useEffect(getSpecificOrders, [])

  function getSpecificOrders() {
    axios.get(URL + '/orders/' + props.customer_id, {
      headers: {
        'x-api-key': access_token
      }
    })
    .then(function (response) {
      const newOrders = response.data
      var i;
      for (i = 0; i < newOrders.length; i++) {
        // const pad_id = String(newOrders[i].customer_id)
        newOrders[i].customer_id = String(newOrders[i].customer_id).padStart(4, '0')
      } 
      setOrders(newOrders);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  const orders_list = (
    <table className="table table-bordered table-sm  hover">
      <thead className="thead-green">
        <tr>
          <th className="text-center left_radius">Order ID</th>
          <th className="text-center">Status</th>
          <th className="text-center">Amount</th>
          <th className="text-center">Date Created</th>
          <th className="text-center right_radius">URL LIST</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order =>
          <tr>
            <td className="text-center">{order.order_id}</td>
            <td className="text-center">{order.status}</td>
            <td className="text-center">{order.num_urls}</td>
            <td className="text-center">{String(order.creation_date).slice(0, 10)}</td>
            <td className="text-center"><CopyToClipboard text={order.urls ? order.urls.join("\n") : ""}><a className="btn btn-primary btn-theme">Copy URLs to Clipboard</a></CopyToClipboard></td>
          </tr>
        )}
      </tbody>
    </table>
    );

  return (
        <ul>
            {orders_list}
        </ul>
    );
}

export default Order;