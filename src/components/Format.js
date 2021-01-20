import React, { useState } from "react";
import Button from 'react-bootstrap/Button'

// Uses regex to add a newline character before every 'h', deletes leading newline character
// TODO: Remove separate format page and integrate formatting into another component

function Format() {
  const [input, setInput] = useState("");

  function newLine() {
      var inputObj = input
      var newLine = inputObj.replace(/h/gi, '\nh');
      var regex = newLine.replace(/\n/, '')
      document.getElementById("formatted").value = regex;


  }

  return (
    <div className="newCustomerForm">
    <form>
      <h2 className="label-wrapper">
      </h2>
        <ul>
            <li>
        <input
          className="inputField"
          value={input}
          onChange={e => setInput(e.target.value)}
          type="text"
          name="input"
          autoComplete="off"
          placeholder="Unformatted URLs"
        ></input>
        </li>
        <div style={{textAlign: "center"}}>
        <Button
        onClick={newLine}>
          Format
        </Button>
        </div>
        </ul>
    </form>
    <div style={{margin: "auto", padding: "10px", width: "30%"}}>
    <textarea style={{textAlign: "center"}} id="formatted" rows="8" cols="40" readOnly>Formatted Text here</textarea>
    </div>
    </div>
  );
}

export default Format;

