require('dotenv').config();
const express = require('express');
const cors = require("cors");

const app = express();
const port = 5500;

app.use(cors());
app.use(express.json());

const connection = require('./db/dbConfig');

const usersRoutes = require("./routes/userRoute");
const questionsRoutes = require("./routes/questionRoute");
const answerRoutes = require("./routes/answerRoute");
const auth = require("./middleware/authMiddleWare");

app.use("/api/users", usersRoutes);
app.use("/api/questions", auth, questionsRoutes);
app.use("/api/answers", auth, answerRoutes);

(async () => {
  try {
    const result = await connection.execute("SELECT 'test'");
    console.log(result); // Print the result of the test query

    await app.listen(port);
    console.log("Database connection established :)");
    console.log(`Listening on ${port}: http://localhost:${port}`);
  } catch (err) {
    console.error(err.message);
}
})();
