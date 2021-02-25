import React, { Component, useState } from "react";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import axios from "axios"; 

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Connection': 'keep-alive',
  'Host': 'localhost:3000',
  'Content-Length': '105',
  'Accept': '*/*',
  'Cookie': '_ga=GA1.2.2116708883.1610681366; __utmz=109787653.1610751062.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); PHPSESSID=s9r60ceklpl4r1i58psbi9cav0; __utma=109787653.2116708883.1610681366.1613162109.1613681064.18; __utmb=109787653.0.10.1613681064; __utmc=109787653'
}

const data = {
  'inputTextValues2': '[["www.google.ca"],["www.test.com"],[null]]',
  'outputFolderName': 'test222'
}

const postQR = () => {
  fetch("https://qed.builtspace.com/webapp_Builtspace/upload_manual2.php", {
  method: 'POST',
  headers: headers,
  body: data
}).then(res => {
  return res
})
.then(data => console.log(data))
.catch(error => console.log('ERROR'))
}





function Homepage() {

  // const [postQrNow, setPostQrNow] = useState(false)

  // const postQR = () => {
  //   $('#idsaretoxicareyoustupid').html(
  //     <form method="POST" action="">
  //       <input type="hidden" name="stuffstuff" value="allthiscrapomgsomuchdata"></input>
  //       <input type="hidden" name="stuffstuff" value="allthiscrapomgsomuchdata"></input>
  //       <input type="hidden" name="stuffstuff" value="allthiscrapomgsomuchdata"></input>
  //       <input type="hidden" name="stuffstuff" value="allthiscrapomgsomuchdata"></input>
  //     </form> 
  //   ).submit();

  // }


  return (
    <>
      {/* <div id="idsaretoxicareyoustupid" style="visibility:hidden">
        <img src="....."></img>
        <script src="cdn.jquery.com/jquery.js"></script>
        <script>
          // nothing I can do here can see the actual fucking jquery code itself.
          // but it CAN see any global variables that were written-to by jquery.js, because, duh, they're global variables.
          // for example, jquery.js does, more or less, this:
          // $ = () => { /* holy shit so much code */ }
        {/* </script> */}

      {/* </div> */}
      <div>
        <input type="button" value="Post" onClick={postQR}/>
      </div>
    </>
  );
}




// function Homepage() {

//   const [postQrNow, setPostQrNow] = useState(false)

//   const postQR = () => {

//     // maybe also set some other state or some shit, so that the form knows what to read

//     setPostQrNow(true);

//   }

//   if (postQrNow) {
//     return (
//       <form>
//         <input type="hidden" name="stuffstuff" value="allthiscrapomgsomuchdata"></input>
//       </form> 
//     )
//   } else {

//     return (
//       <div>
//         <input type="button" value="Post" onClick={postQR}/>
//       </div>
//     );
//   }
// }

export default Homepage;
