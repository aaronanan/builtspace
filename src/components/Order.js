import React, { useState } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import awsconfig from '../aws-exports';


// TODO: Integrate unused Modal code to display URLs for a specific order, requires new //GET /orders/order_id endpoint

function Order(props) {

    const [orders, setOrders] = useState([0]);
    const URL = awsconfig.aws_cloud_logic_custom[0].endpoint;


    const orders_list = (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Status</th>
            <th>Amount</th>
            <th>Date Created</th>
            <th>URL LIST</th>
          </tr>
        </thead>
        <tbody>
      {orders.map(order =>
        <tr>
          <td>{order.order_id}</td>
          <td>{order.status}</td>
          <td>{order.num_urls}</td>
          <td>{String(order.creation_date).slice(0, 10)}</td>
          {/* <td><Button onClick={handleShow} className="btn btn-secondary btn-sm">View</Button></td> */}
          {/* <td>{(order.urls)}</td> */}
          <td><a className="btn btn-primary">go to php</a></td>
        </tr>
      )}
      </tbody>
    </Table>
    );

    
    function getSpecificOrders() {
      // console.log(props.customer_id);
        axios.get(URL + '/orders/' + props.customer_id)
        .then(function (response) {
          // console.log(response);
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
      <div>
        {/* { <Button variant="warning"
        onClick={getSpecificOrders}>
          Get Orders
        </Button> */}
        <td>
        <ul>
            {orders_list}
        </ul>
        </td>
        </div>
    );
}

export default Order;