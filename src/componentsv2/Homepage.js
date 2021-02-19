import React, { Component } from "react";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import axios from "axios"; 

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Connection': 'keep-alive',
  'Host': 'localhost:3000',
  'Content-Length': '105',
  'Accept': '*/*',
  'Cookie': '_ga=GA1.2.2116708883.1610681366; __utmz=109787653.1610751062.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); PHPSESSID=s9r60ceklpl4r1i58psbi9cav0; __utma=109787653.2116708883.1610681366.1613162109.1613681064.18; __utmb=109787653.0.10.1613681064; __utmc=109787653',
  'strict-origin-when-cross-origin': '*'
}

const data = {
  'inputTextValues2': '[["www.google.ca"],["www.test.com"],[null]]',
  'outputFolderName': 'test222'
}

const postQR = () => {
  axios.post('https://qed.builtspace.com/webapp_Builtspace/upload_manual2.php', data, headers)
  .then((res) => {
    console.log("RESPONSE RECEIVED: ", res);
  })
  .catch((err) => {
    console.log("AXIOS ERROR: ", err);
  });
}



function Homepage() {
  return (
    <div>
      <input type="button" value="Post" onClick={postQR}/>
    </div>
  );
}

export default Homepage;
