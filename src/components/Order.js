import React, { useState } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import awsconfig from '../aws-exports';
import CopyToClipboard from 'react-copy-to-clipboard';
// TODO: Integrate unused Modal code to display URLs for a specific order, requires new //GET /orders/order_id endpoint

function Order(props) {

    const [orders, setOrders] = useState([0]);
    const URL = awsconfig.aws_cloud_logic_custom[0].endpoint;


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
          <td className="text-center"><CopyToClipboard text={order.urls ? order.urls.join(",\n") : ""}><a className="btn btn-primary btn-theme">Copy URLs to Clipboard</a></CopyToClipboard></td>
        </tr>
      )}
      </tbody>
    </table>
    );
    
    function getSpecificOrders() {
        axios.get(URL + '/orders/' + props.customer_id)
        .then(function (response) {
          const newOrders = response.data
          var i;
          for (i = 0; i < newOrders.length; i++) {
                const pad_id = String(newOrders[i].customer_id)
                newOrders[i].customer_id = pad_id.padStart(4, '0')
          } 
          setOrders(newOrders);
          return response.data
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    getSpecificOrders()
  return (
        <ul>
            {orders_list}
        </ul>
    );
}

export default Order;