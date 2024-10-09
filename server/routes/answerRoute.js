const express = require('express');
const router = express.Router();

const {
    postAnswer,
    answerForQuestion,
} = require('../controller/answerController');

//answer route
router.post('/', postAnswer);

router.get('/:question_id', answerForQuestion);

//export the route
module.exports = router;