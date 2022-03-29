const express = require("express");
const res = require("express/lib/response");
const cors = require("cors");
var bodyParser = require("body-parser");
const routeUser = require("./routes/user.js")
const routeProject = require("./routes/project.js")


const appp = express();
appp.use(express.json());

appp.use(bodyParser.urlencoded());
appp.use(cors());
//appp.use(bodyParser.urlencoded({ extended: false }));


// Import the functions you need from the SDKs you need
appp.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const port = process.env.PORT || 3000;
  
routeUser(appp);
routeProject(appp);
// Initialize Firebase





appp.listen(port, function () {
    console.log("Up & RUnning *4000");
});