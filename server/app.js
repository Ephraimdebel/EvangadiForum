require("dotenv").config();
const express = require("express");
const app = express();
const port = 5500;
const dbConnection = require("./db/dbConfig");
const cors = require('cors')
// Middleware to parse JSON bodies
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors())
// //Question routes middleware file



//user routes middleware
const userRoute = require("./routes/userRoute");
app.use('/api/users',userRoute)


const questionRoute = require("./routes/questionRoute");

// //Question routes middleware
app.use("/api/questions", questionRoute);


async function start() {
  try {
    const result = await dbConnection.execute("select 'test' ");
    app.listen(port);
    console.log("database connection established");
    console.log(`listening on port http://localhost:${port}`);
  } catch (error) {
    console.log(error.message);
  }
}
//calling start function
start()
