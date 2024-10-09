
const dbConnection = require("../db/dbConfig");
const express = require("express");
const router = express.Router();

// Function to submit a question
const submitQuestion = async (req, res) => {
  try {
    const { title, description, questionid, userid } = req.body;
// console.log(req.body)
    const newQuestion = await dbConnection.query(
      "INSERT INTO questions (title, description, questionid, userid) VALUES (?, ?, ?, ?)",
      [title, description, questionid, userid]
    );
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Function to get all questions
const getAllQuestions = async (req, res) => {
  try {
    const questions = await dbConnection.query("SELECT * FROM questions");
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to get a single question by id
const getSingleQuestion = async (req, res) => {
  try {
    const id = req.params.id;
    const question = await dbConnection.query("SELECT * FROM questions WHERE questionid = ?", [
      id,
    ]);
    if (question.length === 0) {
      res.status(404).json({ message: "Question not found" });
    } else {
      res.json(question[0]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Route to submit a question
router.post("/askquestion", submitQuestion);

// Route to get all questions
router.get("/getallquestions", getAllQuestions);

// Route to get a single question by id
router.get("/questions/:id", getSingleQuestion);

module.exports = router;












// const db = require("../db/dbConfig");

// const express = require("express");
// const router = express.Router();


// //submit question
// router.post("/question", submitQuestion);
// router.get("/getallquestions", getAllQuestions);
// //get single question
// router.get("/questions/:id", getSingleQuestion);



// exports.getAllQuestions = async (req, res) => {
//   try {
//     const questions = await db.query("SELECT * FROM questions");
//     res.json(questions);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.submitQuestion = async (req, res) => {
//   try {
//     const { title, description, questionid, userid } = req.body;
//     // const userid = req.user.userid; // Getting the user id from authMiddleware
//     // console.log(userid);
//     // const questionid = uuidv4();
//     // console.log(questionid);
//     //    const [question] = await db.query(
//     //   "select * from questions where title = ? and userid= ?",
//     //   [title, userid, description]
//     // );
//     const newQuestion = await db.query(
//       "INSERT INTO questions (title, description,questionid,userid) VALUES (?,?,?,?)",
//       [title, description, questionid, userid]
//     );
//     res.status(201).json(newQuestion);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// exports.getSingleQuestion = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const question = await db.query("SELECT * FROM questions WHERE id = ?", [
//       id,
//     ]);
//     if (question.length === 0) {
//       res.status(404).json({ message: "Question not found" });
//     } else {
//       res.json(question[0]);
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };






// module.exports = router;
