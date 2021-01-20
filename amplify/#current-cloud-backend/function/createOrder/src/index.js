'use strict';
// import App from './app'
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'ca-central-1'});
const { v1: uuidv1 } = require('uuid');



//response helper
const response = (statusCode, body, additionalHeaders) => ({
    statusCode,
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', ...additionalHeaders },
})


function getId(){
  const cust_params = {
		TableName: 'sysVars-prod',
		Key: {
			"tableVars": "orderVars"
		}
    };
    
    return docClient.get(cust_params);
}

function updateId(id){
  const cust_params = {
		TableName: 'sysVars-prod',
		Item: {
			"tableVars": "orderVars",
		  "next_id": id + 1
		},
    };
    
    return docClient.put(cust_params);
}


function getUrl(){
  const url_params = {
		TableName: 'sysVars-prod',
		Key: {
			"tableVars": "urlVars"
		}
    };
    
    return docClient.get(url_params);
}

function updateUrl(id){
  const url_params = {
		TableName: 'sysVars-prod',
		Item: {
			"tableVars": "urlVars",
		  "next_id": parseInt(id) + 1
		},
    };
    
    return docClient.put(url_params);
}

 async function generateUrls(cust_id, order_id,  num_urls){
    
     //GET URL INFO
    let url = await getUrl().promise();
    var next_url = url.Item.next_id
    var url_list = []
    console.log(next_url)
    var i;
    // for (i = 0; i < num_urls; i++) { 
    //     console.log("Generate url", next_url)
    //     const url_pad = String(next_url).padStart(6, '0')
    //     let d = new Date()
    //     let dISO = d.toISOString()
    //     let cust_id_padd = String(cust_id).padStart(4, '0');
    //     let auto_fields = {
    //         "url": "Https://builtspace.com/i/" + cust_id_padd + url_pad,
    //         "cust_id": cust_id,
    //         "order_id": order_id,
    //         "creation_date": dISO,
    //         "lastupdate_date": dISO
    //     }
        
    //     let item_body = {...auto_fields }
        
        
    //     const params = {
    //         TableName: 'urls-dev',
    //         Item: item_body,
    //         ReturnConsumedCapacity: "TOTAL", 
    
    //     }
    //     await docClient.put(params).promise()
    //     next_url += 1
    // }
    
    for (i = 0; i < num_urls; i++) { 
        const url_pad = String(next_url).padStart(6, '0');
        let cust_id_padd = String(cust_id).padStart(4, '0');
        const url = "https://builtspace.com/i/" + cust_id_padd + url_pad
        url_list.push(url)
        next_url += 1
    }
    //Update next
    let update_url =  await updateUrl(next_url).promise();
    return url_list;
}

function addRecord(event, next_id, url_list) {


    // auto generated date fields
    let d = new Date()
    let dISO = d.toISOString()
    let auto_fields = {
        "order_id": next_id,
        "creation_date": dISO,
        "lastupdate_date": dISO,
        "status": "Incomplete",
        "urls": url_list
    }
    // let urls = generateUrls(event.body.customer_id ,next_id , 500);
    //merge the json objects
    let item_body = {...auto_fields, ...JSON.parse(event.body) }

    //final params to DynamoDB
    const params = {
        TableName: 'orders',
        Item: item_body,
        ReturnConsumedCapacity: "TOTAL", 

    }
    

    return docClient.put(params)
}


exports.handler = async (event, context, callback) => {
    // console.log("EVENT:", JSON.parse(event))
    const body = JSON.parse(event.body)
    
    //Get the next URL
    let url = await getUrl().promise();
    var next_url = url.Item.next_id
    //Array for the URLS to go into
    var url_list = []
    //Add as many URLS into the array as num_urls
     var i;
      for (i = 0; i < body.num_urls; i++) { 
        const url_pad = String(next_url).padStart(6, '0');
        
        let cust_id_padd = String(body.customer_id).padStart(4, '0');
        const url = "https://builtspace.com/i/" + cust_id_padd + url_pad
        url_list.push(url)
        next_url += 1
    }
    let update_url =  await updateUrl(next_url).promise();
    
    //const body = JSON.parse(event.body);
    let id = await getId().promise();
    const next_id = id.Item.next_id
    try{
       
       //generate urls, cust_id to append to front, order_id and number of urls to generate
       
        //Put the new order in the database
        let data = await addRecord(event, next_id, url_list).promise();
        // update next_id
        let update_id = await updateId(next_id).promise();
        // //Update next
        // let update_url =  await updateUrl(next_id).promise();
        return response(200, data)
    }catch (err) {
        return response(400, {message: err.message})
    }
    
 
//   var id =  Math.floor(Math.random() * 1000);
//     const str_id = String(id)
//     var some_urls = []
//     console.log("NUMBER--------", body.num_urls);
//     var serial = Math.floor(Math.random() * 100000);
//     const order_id =  Math.floor(Math.random() * 11);
//     var m = new Date();
//     const num = body.num_urls;
//     var i;
//     console.log("num", num)
//     for (i = 0; i < num; i++) {
//         serial += 1;
//         const str_serial = String(serial);
//         const padded_serial = str_serial.padStart(6, '0');
//         console.log("In Loop--------", i);
//         var url = 'https://www.builtspace.com/i/' + padded_cust_id + padded_serial;
//         some_urls.push(url)
//     }
//     console.log(some_urls)
//         var url_params = {
//             TableName: "urls-dev",
//             Item: {
//                 "url": "fff",
//                 "cust_id": parseInt(cust_id),
//                 "order_id": str_id,
//                 "date_created": dateString,
//                 "serial": JSON.stringify(some_urls)
                
//             }
//         };
//         docClient.put(url_params, function(err, data) {
//             if (err) {
//                 console.log(err);
//                 callback(err, null);
//             }
//             else {
//                 console.log("Url Created");
//             }
//         });
    

//         var order_params = {
//             Item: {
//           "cust_idorder_id": str_id, 
//           "status": "Incomplete",
//           "date_created": m.getUTCFullYear() +"/"+ (m.getUTCMonth()+1) +"/"+ m.getUTCDate() + " " + m.getUTCHours() + ":" + m.getUTCMinutes() + ":" + m.getUTCSeconds(),
//           "date_completed": '',
//           "customer_id": parseInt(body.customer_id),
//           "num_urls": parseInt(body.num_urls),
//             }, 
//             ReturnConsumedCapacity: "TOTAL", 
//             TableName: "spaceOrders-dev"
//  }; 
     
    
     
 
//     docClient.put(order_params, function(err, data) {
//         if (err) {
//             callback(err, null);
//         }
//         else {
//             var response = {
//                 "statusCode": 200,
//                 "headers": {
//                 "Access-Control-Allow-Origin": "*"
//             },
//             "body": JSON.stringify(data),
//             "isBase64Encoded": false
//             };
           
//         }
//     });
//   var response = {
//                 "statusCode": 200,
//                 "headers": {
//                 "Access-Control-Allow-Origin": "*"
//             },
//             "body": JSON.stringify(some_urls),
//             "isBase64Encoded": false
//             };
//  callback(null, response);
};
