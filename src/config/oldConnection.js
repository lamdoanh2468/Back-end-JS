//Export env 
require('dotenv').config();
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: process.env.DB_HOST,//'localhost' ==> USES DATA IN ENV FILE,
    port: process.env.DB_PORT,
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

module.exports = connection;