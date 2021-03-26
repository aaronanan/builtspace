const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'ca-central-1'});


exports.handler = async (event, context) => {
  
  console.log("Event:", event);
  
  const body = JSON.parse(event.body);
  const order_id = parseInt(body.order_id, );
  const creation_date = body.creation_date;
  const status = body.order_status;
  const updated_date = new Date().toISOString()
  // const updated_date = new Date().toLocaleString( 'sv', { timeZoneName: 'short' } );
    
  var params = {
    TableName: "orders",
    Key: {
      order_id : order_id,
      creation_date : creation_date
    },
    UpdateExpression: "set #status = :order_status, lastupdate_date = :lastupdate_date",
    ExpressionAttributeValues:{
      ":order_status":status,
      ":lastupdate_date":updated_date
    },
    ExpressionAttributeNames:{"#status":"status"},
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