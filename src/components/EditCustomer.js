import React, { Component, useEffect, useState } from "react";
import { Input, TextField } from "@material-ui/core";
import axios from "axios";
import { access_token, URL } from "../aws-token";
import "../styles/editCustomer.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/Customers.css";

const EditCustomer = (props) => {
  const customer_id = parseInt(props.location.pathname.replace(/^\D+/g, ""));

  const [customer, setCustomer] = useState([]);

  useEffect(getCustomer, []);

  function getCustomer() {
    axios
      .get(URL + "/customers/" + customer_id, {
        headers: {
          "x-api-key": access_token,
        },
      })
      .then(function (response) {
        // console.log(response.data.Item);
        setCustomer([response.data.Item]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function updateCustomer() {
    axios
      .put(
        URL + "/customers/",
        {
          customer_id: customer[0].customer_id,
          cus_contact: customer[0].cus_contact,
          cus_design: customer[0].cus_design,
          cus_org_name: customer[0].cus_org_name,
          cus_shipping: customer[0].cus_shipping,
          cus_status: customer[0].cus_status,
          partner_contact: customer[0].partner_contact,
          partner_id: customer[0].partner_id,
          sales_contact: customer[0].sales_contact,
          serial_prefix: customer[0].serial_prefix,
        },
        {
          headers: {
            "x-api-key": access_token,
          },
        }
      )
      .then(function (response) {
        // props.history.push('/profile/' + customer_id)
        window.history.back();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function deleteCustomer() {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete Customer ${customer[0].cus_org_name}?`
    );
    if (confirmDelete == true) {
      axios
        .delete(URL + "/customers/", {
          data: {
            customer_id: customer_id,
          },
          headers: {
            "x-api-key": access_token,
          },
        })
        .then(function (response) {
          // console.log(response);
          document.getElementById("deletedCustomer").click();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  const customers_list = customer.map((cus, index) => (
    <div style={{ paddingBottom: "200px" }}>
      <div key={index} className="editForm">
        <div>
          <div style={{ padding: "20px" }}>
            <h3 className="header">Edit Customer</h3>
            <h5 style={{ color: "#00a14b" }}>Contact Information</h5>
            <hr style={{ backgroundColor: "#00a14b" }} />
            <div style={{ marginTop: "25px" }}>
              <table style={{ width: "100%" }}>
                <tr>
                  <td>
                    <TextField
                      style={{ width: "400px", marginLeft: "15px" }}
                      label="Customer"
                      size="small"
                      defaultValue={cus.cus_org_name}
                      variant="outlined"
                      onChange={(e) => {
                        customer[0].cus_org_name = e.target.value;
                      }}
                    />
                  </td>
                  <td>
                    <TextField
                      style={{ width: "400px", marginLeft: "15px" }}
                      label="Contact Name"
                      size="small"
                      defaultValue={cus.cus_contact.c_name}
                      variant="outlined"
                      onChange={(e) => {
                        customer[0].cus_contact.c_name = e.target.value;
                      }}
                    />
                  </td>
                </tr>
                <br />
                <tr>
                  <td>
                    <TextField
                      style={{ width: "400px", marginLeft: "15px" }}
                      size="small"
                      label="Email"
                      defaultValue={cus.cus_contact.c_email}
                      variant="outlined"
                      onChange={(e) => {
                        customer[0].cus_contact.c_email = e.target.value;
                      }}
                    />
                  </td>
                  <td>
                    <TextField
                      style={{ width: "400px", marginLeft: "15px" }}
                      label="Phone"
                      size="small"
                      defaultValue={cus.cus_contact.c_phone}
                      variant="outlined"
                      onChange={(e) => {
                        customer[0].cus_contact.c_phone = e.target.value;
                      }}
                    />
                  </td>
                </tr>
                <br />
                <tr>
                  <td>
                    <TextField
                      style={{ width: "400px", marginLeft: "15px" }}
                      size="small"
                      label="Status"
                      onChange={(e) => {
                        customer[0].cus_status = e.target.value;
                      }}
                      value={customer.cus_status}
                      defaultValue={cus.cus_status}
                      select
                      variant="outlined"
                      SelectProps={{ native: true }}
                    >
                      <option>Active</option>
                      <option>On-Boarding</option>
                      <option>Inactive</option>
                    </TextField>
                  </td>
                  <td>
                    <TextField
                      style={{ width: "400px", marginLeft: "15px" }}
                      label="Serial Prefix"
                      size="small"
                      defaultValue={cus.serial_prefix}
                      variant="outlined"
                      onChange={(e) => {
                        customer[0].serial_prefix = e.target.value;
                      }}
                    />
                  </td>
                </tr>
                <br />
                <tr>
                  <td>
                    <TextField
                      style={{ width: "400px", marginLeft: "15px" }}
                      label="Preferred Template"
                      size="small"
                      defaultValue={cus.cus_design}
                      variant="outlined"
                      onChange={(e) => {
                        customer[0].cus_design = e.target.value;
                      }}
                    />
                  </td>
                </tr>
              </table>

              {/* <TextField style={{marginLeft:"15px"}} label="Status" defaultValue={cus.cus_status} variant="outlined" onChange={(e) => {customer[0].cus_status = e.target.value}} /> */}
            </div>
          </div>

          <div style={{ padding: "20px" }}>
            <h5 style={{ color: "#00a14b" }}>Shipping Information</h5>
            <hr style={{ backgroundColor: "#00a14b" }} />
            <div style={{ marginTop: "25px" }}>
              <table style={{ width: "100%" }}>
                <tr>
                  <td>
                    <TextField
                      style={{ width: "400px", marginLeft: "15px" }}
                      label="Address"
                      size="small"
                      defaultValue={cus.cus_shipping.address}
                      variant="outlined"
                      onChange={(e) => {
                        customer[0].cus_shipping.address = e.target.value;
                      }}
                    />
                  </td>
                  <td>
                    <TextField
                      style={{ width: "400px", marginLeft: "15px" }}
                      label="City"
                      size="small"
                      defaultValue={cus.cus_shipping.city}
                      variant="outlined"
                      onChange={(e) => {
                        customer[0].cus_shipping.city = e.target.value;
                      }}
                    />
                  </td>
                </tr>
                <br />
                <tr>
                  <td>
                    <TextField
                      style={{ width: "400px", marginLeft: "15px" }}
                      label="Country"
                      size="small"
                      defaultValue={cus.cus_shipping.country}
                      variant="outlined"
                      onChange={(e) => {
                        customer[0].cus_shipping.country = e.target.value;
                      }}
                    />
                  </td>
                  <td>
                    <TextField
                      style={{ width: "400px", marginLeft: "15px" }}
                      label="Postal Code"
                      size="small"
                      defaultValue={cus.cus_shipping.post}
                      variant="outlined"
                      onChange={(e) => {
                        customer[0].cus_shipping.post = e.target.value;
                      }}
                    />
                  </td>
                </tr>
                <br />
                <tr>
                  <td>
                    <TextField
                      style={{ width: "400px", marginLeft: "15px" }}
                      label="Province"
                      size="small"
                      defaultValue={cus.cus_shipping.province}
                      variant="outlined"
                      onChange={(e) => {
                        customer[0].cus_shipping.province = e.target.value;
                      }}
                    />
                  </td>
                </tr>
              </table>
            </div>
          </div>

          <div style={{ padding: "20px" }}>
            <h5 style={{ color: "#00a14b" }}>Partner Information</h5>
            <hr style={{ backgroundColor: "#00a14b" }} />
            <div style={{ marginTop: "25px" }}>
              <table style={{ width: "100%" }}>
                <tr>
                  {/* <td>
                    <TextField
                      style={{
                        width: "400px",
                        marginLeft:"15px"
                      }}
                      size="small"
                      label="Partner ID"
                      defaultValue={cus.partner_id}
                      variant="outlined"
                      onChange={(e) => {
                        customer[0].partner_id = e.target.value;
                      }}
                    />
                  </td> */}
                  <td>
                    <TextField
                      style={{ width: "400px", marginLeft: "15px" }}
                      label="Partner Name"
                      size="small"
                      defaultValue={cus.partner_contact.p_name}
                      variant="outlined"
                      onChange={(e) => {
                        customer[0].partner_contact.p_name = e.target.value;
                      }}
                    />
                  </td>
                  <td>
                    <TextField
                      style={{
                        width: "400px",
                        marginLeft: "15px",
                      }}
                      size="small"
                      label="Partner Email"
                      defaultValue={cus.partner_contact.p_email}
                      variant="outlined"
                      onChange={(e) => {
                        customer[0].partner_contact.p_email = e.target.value;
                      }}
                    />
                  </td>
                </tr>
                <br />
                <tr>
                  <td>
                    <TextField
                      style={{
                        width: "400px",
                        marginLeft: "15px",
                      }}
                      size="small"
                      label="Partner Phone"
                      defaultValue={cus.partner_contact.p_phone}
                      variant="outlined"
                      onChange={(e) => {
                        customer[0].partner_contact.p_phone = e.target.value;
                      }}
                    />
                  </td>
                </tr>
              </table>
            </div>
          </div>

          <div style={{ padding: "20px" }}>
            <h5 style={{ color: "#00a14b" }}>Sales Contact</h5>
            <hr style={{ backgroundColor: "#00a14b" }} />
            <div style={{ marginTop: "25px" }}>
              <table style={{ width: "100%" }}>
                <tr>
                  <td>
                    <TextField
                      style={{ width: "400px", marginLeft: "15px" }}
                      label="Sales Name"
                      size="small"
                      defaultValue={cus.sales_contact.s_name}
                      variant="outlined"
                      onChange={(e) => {
                        customer[0].sales_contact.s_name = e.target.value;
                      }}
                    />
                  </td>
                  <td>
                    <TextField
                      style={{ width: "400px", marginLeft: "15px" }}
                      label="Sales Email"
                      size="small"
                      defaultValue={cus.sales_contact.s_email}
                      variant="outlined"
                      onChange={(e) => {
                        customer[0].sales_contact.s_email = e.target.value;
                      }}
                    />
                  </td>
                </tr>
                <br />
                <tr>
                  <td>
                    <TextField
                      style={{ width: "400px", marginLeft: "15px" }}
                      label="Sales Phone"
                      size="small"
                      defaultValue={cus.sales_contact.s_phone}
                      variant="outlined"
                      onChange={(e) => {
                        customer[0].sales_contact.s_phone = e.target.value;
                      }}
                    />
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>

        <>
          <div
            style={{
              textAlign: "center",
              paddingTop: "30px",
              paddingBottom: "40px",
              marginTop:"50px"
            }}
          >
            <Button
              style={{ width: "150px", fontSize:"18px", borderRadius:"10px" }}
              onClick={updateCustomer}
              className="btn btn-success"
              variant="contained"
            >
              Save Changes
            </Button>
            {/* <a href="/customers"><Button style={{width:"150px", marginLeft:'50px'}} onClick={deleteCustomer} className="btn btn-danger">Delete</Button></a> */}
            <Button
              style={{ width: "150px", fontSize:"18px", marginLeft: "50px", borderRadius:"10px", backgroundColor:"red" }}
              onClick={deleteCustomer}
              className="btn btn-danger"
            >
              Delete
            </Button>
            {/* <Link to="/customers"><Button style={{marginLeft:'50px', width:"150px"}} className="btn btn-md btn-secondary">Cancel</Button></Link> */}
            <Button
              onClick={() => window.history.back()}
              style={{ marginLeft: "50px", width: "150px", fontSize:"18px", marginLeft: "50px", borderRadius:"10px" }}
              className="btn btn-md btn-secondary"
            >
              Cancel
            </Button>
            <Link to="/customers">
              <Input type="hidden" id="deletedCustomer">
                Delete
              </Input>
            </Link>
          </div>
        </>
      </div>
    </div>
  ));

  return (
    <>
      {customers_list}
      {/* <input type="button" value="Test" onClick={()=>{console.log(customer)}} /> */}
    </>
  );
};

export default EditCustomer;
