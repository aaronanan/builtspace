import React from "react";
import axios from 'axios';


// TODO: Add more customer info fields, add axios.post request to update customer info

function Profile(props) {


  var customer_id = parseInt(props.location.query.customer_id);
  // console.log(customer_id);

  axios.get(URL + '/customers/' + customer_id)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  
  return (
    <div>
      Customer ID is {customer_id}
    </div>
  );
}

export default Profile;