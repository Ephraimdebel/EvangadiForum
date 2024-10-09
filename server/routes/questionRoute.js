const express = require('express');
const router = express.Router();

const auth = require('../middleware/authMiddleWare');
//post question code starts here
const {
  postQuestion,
  allQuestions,
  getSingleQuestion,
} = require('../controller/questionController');

// Post question route
router.post('/', postQuestion);


// Get Single Question
router.get('/:question_id', getSingleQuestion);

router.get('/', allQuestions);

module.exports = router;