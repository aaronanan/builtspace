import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import awsconfig from "../aws-exports";
import "../styles/form.css";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Input, TextField } from "@material-ui/core";

// TODO: Store multiple values in one state instead of having state for each field
// This form currently accepts input for Organization, Customer Name and Status and passes the rest of the data fields as blank/null

function Form(props) {
  const URL = "https://hwwscimuxe.execute-api.ca-central-1.amazonaws.com/dev";
  const [open, setOpen] = useState(true);
  const [ContactName, setContactName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [status, setStatus] = useState("Active");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [ContactEmail, setContactEmail] = useState("");
  const [ContactPhone, setContactPhone] = useState("");
  const [pref_des, setPrefDes] = useState("");
  const [org_id, setOrgId] = useState("");
  const [serial_prefix, setSerialPrefix] = useState("");
  const [sales_cont_name, setSalesContName] = useState("");
  const [sales_cont_email, setSalesContEmail] = useState("");
  const [sales_cont_phone, setSalesContPhone] = useState("");
  const [partner_id, setPartnerId] = useState("");
  const [partner_name, setPartnerName] = useState("");
  const [partner_email, setPartnerEmail] = useState("");
  const [partner_phone, setPartnerPhone] = useState("");

  function musicianRegisterModal() {
    // Get the modal
    document.getElementById("registerModal").style.display = "block";
  }

  function closeModal() {
    window.location.replace(process.env.PUBLIC_URL + "/#/customers");
  }

  window.onclick = function (event) {
    let modal = document.getElementById("registerModal");
    if (event.target == modal) {
      window.location.replace(process.env.PUBLIC_URL + "/#/customers");
    }
  };

  function handleSubmit(e) {
    // const confirmCreate = window.confirm(`Are you sure you want to delete Order ${order_id}?`)
    e.preventDefault();
    axios
      .post(URL + "/customers", {
        cus_status: status,
        cus_design: pref_des,
        cus_org_name: orgName,
        cus_org_id: org_id,
        cus_contact: {
          c_name: ContactName,
          c_email: ContactEmail,
          c_phone: ContactPhone,
        },
        cus_shipping: {
          address: address,
          city: city,
          province: province,
          post: postalCode,
          country: country,
        },
        partner_id: partner_id,
        partner_contact: {
          p_name: partner_name,
          p_email: partner_email,
          p_phone: partner_phone,
        },
        sales_contact: {
          s_name: sales_cont_name,
          s_email: sales_cont_email,
          s_phone: sales_cont_phone,
        },
        serial_prefix: serial_prefix,
      })
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
    setContactName("");
    setOrgName("");
    setStatus(status);
    setAddress("");
    setCity("");
    setCountry("");
    setProvince("");
    setPostalCode("");
    setContactName("");
    setContactEmail("");
    setContactPhone("");
    setPrefDes("");
    setOrgId("");
    setSerialPrefix("");
    setSalesContName("");
    setSalesContEmail("");
    setSalesContPhone("");
    setPartnerId("");
    setPartnerName("");
    setPartnerEmail("");
    setPartnerPhone("");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div style={{ paddingBottom: "200px" }}>
          <div className="editForm">
            <div
              className="col-8"
              style={{
                marginTop: "50px",
                textAlign: "center",
                paddingTop: "5px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <p className="h2 formLabel" style={{ color: "#00a14b" }}>
                Create a Customer
              </p>
            </div>
            <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
              <hr style={{ backgroundColor: "#00a14b" }} />
              <br></br>
            </div>
            <div>
              <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                <h5 style={{ color: "#00a14b" }}>Customer Information</h5>
                <hr style={{ backgroundColor: "#00a14b" }} />
                <div style={{ marginTop: "25px" }}>
                  <TextField
                    style={{ width: "150px", marginLeft: "15px" }}
                    label="Organization ID"
                    variant="outlined"
                    value={org_id}
                    onChange={(e) => setOrgId(e.target.value)}
                  />
                  <TextField
                    style={{ marginLeft: "15px" }}
                    label="Organization Name"
                    // variant="outlined"
                    size="small"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                  />
                  <TextField
                    style={{ width: "200px", marginLeft: "15px" }}
                    variant="outlined"
                    size="small"
                    label="Contact Name"
                    value={ContactName}
                    onChange={(e) => setContactName(e.target.value)}
                  />
                  <TextField
                    style={{ width: "200px", marginLeft: "15px" }}
                    variant="outlined"
                    label="Email"
                    value={ContactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                  />
                  <br></br>
                  <TextField
                    style={{ marginTop: "15px", marginLeft: "15px" }}
                    variant="outlined"
                    label="Phone"
                    value={ContactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                  />
                  <TextField
                    style={{
                      marginLeft: "15px",
                      width: "150px",
                      marginTop: "15px",
                    }}
                    variant="outlined"
                    label="Status"
                    select
                    variant="outlined"
                    onChange={(e) => setStatus(e.target.value)}
                    defaultValue="Customer Status"
                    SelectProps={{ native: true }}
                  >
                    <option>Active</option>
                    <option>On-boarding</option>
                    <option>Inactive</option>
                  </TextField>
                  <TextField
                    style={{
                      marginLeft: "15px",
                      width: "150px",
                      marginTop: "15px",
                    }}
                    label="Serial Prefix"
                    variant="outlined"
                    value={serial_prefix}
                    onChange={(e) => setSerialPrefix(e.target.value)}
                  />
                  <TextField
                    style={{
                      marginLeft: "15px",
                      width: "150px",
                      marginTop: "15px",
                    }}
                    label="Prefered template"
                    variant="outlined"
                    value={pref_des}
                    onChange={(e) => setPrefDes(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ padding: "20px" }}>
                <h5 style={{ color: "#00a14b" }}>Shipping Information</h5>
                <hr style={{ backgroundColor: "#00a14b" }} />
                <div style={{ marginTop: "25px" }}>
                  <TextField
                    style={{ width: "300px", marginLeft: "15px" }}
                    label="Address"
                    variant="outlined"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <TextField
                    style={{ marginLeft: "15px" }}
                    label="City"
                    variant="outlined"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <TextField
                    style={{ marginLeft: "15px" }}
                    label="Province"
                    variant="outlined"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                  />
                  <br></br>
                  <TextField
                    style={{ marginTop: "15px", marginLeft: "15px" }}
                    label="Postal Code"
                    variant="outlined"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                  <TextField
                    style={{ marginTop: "15px", marginLeft: "15px" }}
                    label="Country"
                    variant="outlined"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ padding: "20px" }}>
                <h5 style={{ color: "#00a14b" }}>Partner Information</h5>
                <hr style={{ backgroundColor: "#00a14b" }} />
                <div style={{ marginTop: "25px" }}>
                  <TextField
                    style={{ width: "200px", marginLeft: "15px" }}
                    label="Partner ID"
                    variant="outlined"
                    value={partner_id}
                    onChange={(e) => setPartnerId(e.target.value)}
                  />
                  <TextField
                    style={{ width: "300px", marginLeft: "15px" }}
                    label="Partner Name"
                    variant="outlined"
                    value={partner_name}
                    onChange={(e) => setPartnerName(e.target.value)}
                  />
                  <TextField
                    style={{ marginLeft: "15px", width: "300px" }}
                    label="Partner Email"
                    variant="outlined"
                    value={partner_email}
                    onChange={(e) => setPartnerEmail(e.target.value)}
                  />
                  <TextField
                    style={{
                      marginLeft: "15px",
                      width: "300px",
                      marginTop: "15px",
                    }}
                    label="Partner Phone"
                    variant="outlined"
                    value={partner_phone}
                    onChange={(e) => setPartnerPhone(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ padding: "20px" }}>
                <h5 style={{ color: "#00a14b" }}>Sales Contact</h5>
                <hr style={{ backgroundColor: "#00a14b" }} />
                <div style={{ marginTop: "25px" }}>
                  <TextField
                    style={{ width: "300px", marginLeft: "15px" }}
                    label="Sales Name"
                    variant="outlined"
                    value={sales_cont_name}
                    onChange={(e) => setSalesContName(e.target.value)}
                  />
                  <TextField
                    style={{ marginLeft: "15px" }}
                    label="Sales Email"
                    variant="outlined"
                    value={sales_cont_email}
                    onChange={(e) => setSalesContEmail(e.target.value)}
                  />
                  <TextField
                    style={{ marginLeft: "15px" }}
                    label="Sales Phone"
                    variant="outlined"
                    value={sales_cont_phone}
                    onChange={(e) => setSalesContPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                textAlign: "center",
                paddingTop: "20px",
                paddingBottom: "40px",
              }}
            >
              <div>
                <Button
                  className="btn btn-success"
                  style={{ width: "150px" }}
                  type="submit"
                  onClick={(e) => {
                    musicianRegisterModal();
                  }}
                >
                  Create Customer
                </Button>
                <a
                  className="btn btn-md btn-secondary btn-secondary-form"
                  style={{ width: "150px", marginLeft: "50px" }}
                  href="/#/customers"
                >
                  Cancel
                </a>
              </div>

              <div id="registerModal" class="registerModal">
                <div class="registerModal-content">
                  <span class="close" onClick={closeModal}>
                    &times;
                  </span>
                  <p class="registerModalText">
                    Account succesfully registered.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Form;
