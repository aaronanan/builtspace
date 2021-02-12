import React, { useState, useEffect } from "react";
import axios from 'axios';
import Order from './Order'

import awsconfig from '../aws-exports';


// This component is tied with the CreateOrder component to select a customer ID then make orders for it

function Customer(props) {
    const customer_id = parseInt(props.location.query.customer_id);
    const [customers, setCustomers] = useState([0]);
    const [message, setMessage] = useState('');
    const URL = awsconfig.aws_cloud_logic_custom[0].endpoint;
    const [id, setId] = useState(0);
    const [searched, setSearch] = useState(false)


    useEffect(() => {
      setCustomers([0]);
    }, []);




const customers_list = customers.map(customer => (
  <>
<div id={customer_id} style={{padding: '1em'}}>
<li id="customer_id">
  <b>Customer ID:</b> {customer_id}
</li>
<li id="contact_name">
  <b>Name:</b> {customer.contact_name}
</li>
<li id="email">
  <b>Organization:</b>: {customer.org_name}
</li>
</div>

</>
));


      function handleSubmit() {
      axios.get(URL + '/customers/' + customer_id, 
        {
        "customer_id": customer_id 
        })
      .then(function (response) {

          console.log(response);
        if (Object.keys(response.data).length === 0){
            setMessage('Customer does not exit.' )
            setCustomers([])
        }else {
            setMessage('')
            console.log(response.data)
            setCustomers([response.data.Item])
            setId(response.data.Item.customer_id)
            setSearch(true);        }
        })
      .catch(function (error) {
        console.log(error);
      });
    }
    handleSubmit()
    return (
      // <>
      // </>
        <div>
          <h3 style={{textAlign: "center"}}>Search for Customer ID</h3>
            {/* <form on={handleSubmit}>
        <ul style={{textAlign:"center"}}>
            <li>
        <input
          className="inputField"
          type="text"
          name="customer_id"
          autoComplete="off"
          placeholder="Customer ID"
          pattern="[0-9]+"
          required
        ></input>
        </li>
        <Button type="submit">
          Search
        </Button>
        </ul>
        {message}
        {searched ?    <CreateOrder data={customers} /> : '' }
    </form> */}

        <table>
          <thead>
          </thead>
          <tbody>
            <tr>
            <td>
            <ul>
          {customers_list}
       </ul>
         </td>
         <td>
            <Order
            customer_id={customer_id} />
            </td>
            </tr>
            </tbody>
            </table>
      
       </div>
    );
}

export default Customer;