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
//config req body
app.use(express.json);
app.use(express.urlencoded({extended:true}));
//Using router 
const webRouter = require('./routes/web');
app.use('/', webRouter); // === app.use('/',"[MODULE_NAME]")

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`)
})
