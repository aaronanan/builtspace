import React, { Component, useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';
import axios from "axios"
import { access_token, URL } from "../aws-token" 
import "../styles/editCustomer.css"

const EditCustomer = () => {
    // const URL = awsconfig.aws_cloud_logic_custom[0].endpoint;

    const customer_id = 3;

    const [customer, setCustomer] = useState([]);

    
    const [field, setField] = useState();

    useEffect(getCustomers, [])
    // useEffect(setVariables, [])

    // useEffect(()=>{setField(customer.contact_name)}, [])

    // function setVariables() {
    //     field = customer.contact_name;
    // }
    

    function getCustomers () {
    axios.get(URL + '/customers/' + customer_id, {
        headers: {
        'x-api-key': access_token
        }
    })  
    .then(function (response) {
        setCustomer([response.data.Item])
        setField(response.data.Item.contact_name)
        }
    )
    .catch(function (error) {
        console.log(error);
    });
    }
        
    const customers_list = customer.map((customer, index) => 
    <div key={index} style={{textAlign:"center"}}>
        <div style={{backgroundColor:"lightgrey", maxWidth:"250px", padding:"20px", display:"inline-block"}}>
            <h5>Contact Information</h5>
            <div style={{marginTop:"15px"}}>
                <TextField style={{marginTop:"15px"}} label="Contact Name" defaultValue={customer.contact_name} variant="outlined" onChange={(e) => {customer["contact_name"] = e.target.value}} />
                <TextField style={{marginTop:"15px"}} label="Contact Name" defaultValue={customer.org_id} variant="outlined" onChange={(e) => {customer["contact_name"] = e.target.value}} />
                <TextField style={{marginTop:"15px"}} label="Contact Name2" defaultValue={customer.contact_person.email} variant="outlined" onChange={(e) => {setField(e.target.value)}} />
                <TextField style={{marginTop:"15px"}} label="Contact Name3" defaultValue={customer.contact_person.phone} variant="outlined" onChange={(e) => {setField(e.target.value)}} /> 
            </div>
        </div>

        <div style={{backgroundColor:"lightgrey", maxWidth:"250px", padding:"20px", display:"inline-block", marginLeft:"50px"}}>
            <h5>Contact Information</h5>
            <div style={{marginTop:"15px"}}>
                <TextField style={{marginTop:"15px"}} label="Contact Name" defaultValue={customer.contact_name} variant="outlined" onChange={(e) => {customer["contact_name"] = e.target.value}} />
                <TextField style={{marginTop:"15px"}} label="Contact Name" defaultValue={customer.org_id} variant="outlined" onChange={(e) => {customer["contact_name"] = e.target.value}} />
                <TextField style={{marginTop:"15px"}} label="Contact Name2" defaultValue={customer.contact_person.email} variant="outlined" onChange={(e) => {setField(e.target.value)}} />
                <TextField style={{marginTop:"15px"}} label="Contact Name3" defaultValue={customer.contact_person.phone} variant="outlined" onChange={(e) => {setField(e.target.value)}} /> 
            </div>
        </div>

        <div style={{backgroundColor:"lightgrey", maxWidth:"250px", padding:"20px", display:"inline-block", marginLeft:"50px"}}>
            <h5>Contact Information</h5>
            <div style={{marginTop:"15px"}}>
                <TextField style={{marginTop:"15px"}} label="Contact Name" defaultValue={customer.contact_name} variant="outlined" onChange={(e) => {customer["contact_name"] = e.target.value}} />
                <TextField style={{marginTop:"15px"}} label="Contact Name" defaultValue={customer.org_id} variant="outlined" onChange={(e) => {customer["contact_name"] = e.target.value}} />
                <TextField style={{marginTop:"15px"}} label="Contact Name2" defaultValue={customer.contact_person.email} variant="outlined" onChange={(e) => {setField(e.target.value)}} />
                <TextField style={{marginTop:"15px"}} label="Contact Name3" defaultValue={customer.contact_person.phone} variant="outlined" onChange={(e) => {setField(e.target.value)}} /> 
            </div>
        </div>
        
    </div>
    );
      

    return (
        <>
        {customers_list}
        <div style={{textAlign:"center", marginTop:"50px"}}>
            <input type="button" value="Save Changes" />
        </div>
        </>
        
    );
}

export default EditCustomer;