const express = require('express');
require('dotenv').config()
// console.log(">>> check env", process.env); //process env :Map Or Dictionary
// => process.env.[VALUE OF KEY IN PROCESS]
console.log("The port is:", process.env.PORT);

//import express from 'express' es module
const app = express() //app express
const port = process.env.PORT || 8081
// const port = process.env
const hostname = 'localhost'

//Config view engine 
const configViewEngine = require('./config/viewEngine');
configViewEngine(app);

//Using router 
const webRouter = require('./routes/web');
app.use('/', webRouter); // === app.use('/',"[MODULE_NAME]")
//Test connection
const dbConnection = require('./config/database');
dbConnection.query('SELECT * FROM `USERS`',
  function (err, results, fields) {
    console.log("Result:", results); // results contains rows returned by server
    // console.log("Fields:", fields); // fields contains extra meta data about results, if available
  });
//Database connection

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`)
})