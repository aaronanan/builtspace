import React, { Component } from 'react';
import { CSVLink, CSVDownload } from "react-csv";

function QRGen() {

    const csvData = [
        ["firstname", "lastname", "email"],
        ["Ahmed", "Tomi", "ah@smthing.co.com"],
        ["Raed", "Labes", "rl@smthing.co.com"],
        ["Yezzi", "Min l3b", "ymin@cocococo.com"]
      ];

        return (
            <div>
                Hello Test 
                <CSVLink data={csvData}>Download me</CSVLink>;
            </div>
        );
}

export default QRGen;