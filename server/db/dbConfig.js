const mysql2 = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const dbConnection =mysql2.createPool({
    user:  process.env.DB_USER ,
    database: process.env.DB_DATABASE,
    host: "localhost",
    password: process.env.DB_PASSWORD,
    connectionLimit:10
})





module.exports = dbConnection.promise()