const mysql2 = require("mysql2")
const dbConnection = mysql2.createPool({
    user: process.env.USER,
    database: process.env.DATABASE,
    host: "localhost",
    password: process.env.PASSWORD,
    connectionLimit:10,
})

console.log(process.env.DATABASE)
// dbConnection.execute("select 'tset' ", (err, result) => {
//     if(err) throw err
//     console.log(result)
// })

module.exports = dbConnection.promise()