// const path = require('path');
// const helmet = require('helmet') // creates headers that protect from attacks (security)
const express = require("express");
const app = express();
// const mysql = require("mysql");
const cors = require("cors");
// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
// const session = require("express-session");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;  // allows/disallows cross-site communication


// app.use(helmet())
// --> Add this
// app.use(cors(corsOptions));

app.use(
  cors({
    origin: ["http://localhost:8080"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// app.use(cookieParser());
app.use(express.json());

app.post('https://qed.builtspace.com/webapp_Builtspace/upload_manual2.php', (req, res) => {
    console.log(req)
})



  
const PORT = process.env.PORT || 8080
app.listen(PORT, (req, res) => {
    console.log(`server listening on port: ${PORT}`)
});
  