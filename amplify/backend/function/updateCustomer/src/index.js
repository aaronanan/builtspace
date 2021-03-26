/* Amplify Params - DO NOT EDIT
	API_QRV1API_APIID
	API_QRV1API_APINAME
	ENV
	FUNCTION_CREATECUSTOMER_NAME
	FUNCTION_CREATEORDER_NAME
	FUNCTION_DELETECUSTOMER_NAME
	FUNCTION_GETCUSTOMERS_NAME
	FUNCTION_GETCUSTOMER_NAME
	FUNCTION_GETORDERS_NAME
	FUNCTION_QRV1LAMBDA_NAME
	REGION
	STORAGE_CUSTOMERS_ARN
	STORAGE_CUSTOMERS_NAME
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'ca-central-1'});


exports.handler = async (event, context) => {
  
  console.log("Event:", event);
  
  const body = JSON.parse(event.body);
  const customer_id = parseInt(body.customer_id, );
  const cus_status = body.cus_status;
  const pref_des = body.pref_des;
  const org_id = body.org_id;
  const org_name = body.org_name;
  const contact_name = body.contact_name;
  const contact_person = body.contact_person;
  const ship_address = body.ship_address;
  const partner_id = body.partner_id;
  const partner_contact = body.partner_contact;
  const sales_contact = body.sales_contact;
  const updated_date = new Date().toISOString()
  

  var params = {
    TableName: "customers-deploy",
    Key: {
      customer_id : customer_id,
    },
    UpdateExpression: "set cus_status = :cus_status, pref_des = :pref_des, org_id = :org_id, org_name = :org_name, contact_name = :contact_name, contact_person = :contact_person, ship_address = :ship_address, partner_id = :partner_id, partner_contact = :partner_contact, sales_contact = :sales_contact, lastupdate_date = :lastupdate_date",
    ExpressionAttributeValues:{
      ":cus_status":cus_status,
      ":pref_des":pref_des,
      ":org_id":org_id,
      ":org_name":org_name,
      ":contact_name":contact_name,
      ":contact_person":contact_person,
      ":ship_address":ship_address,
      ":partner_id":partner_id,
      ":partner_contact":partner_contact,
      ":sales_contact":sales_contact,
      ":lastupdate_date":updated_date
    },
    ReturnValues:"UPDATED_NEW"
  };

  console.log("Updating the item...");
  try {
    const response = await docClient.update(params, function(err, data) {
      if (err) {
          console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
          console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
      }
    }).promise();
    
    return { 
      "statusCode": 200,
      "headers": {
        "Access-Control-Allow-Origin": "*"
      },
        body: JSON.stringify(response)
    };
    
  } catch (err) {
    
    return { 
      "statusCode": err.statusCode,
      "headers": {
        "Access-Control-Allow-Origin": "*"
      },
        body: JSON.stringify(err)
    };
    
  }

}