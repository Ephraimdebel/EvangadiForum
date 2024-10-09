const connection = require('../db/dbConfig');
const { StatusCodes } = require('http-status-codes');
const uuidv4 = require('uuid').v4;

const answerForQuestion = async function (req, res) {
    const { question_id } = req.params; // Get the question_id from request parameters
    console.log('Received questionid:', question_id); // Log received question_id for debugging

    try {
        const [answers] = await connection.query(
            `SELECT a.question_id, a.answer_id, a.answer, u.username AS username, a.user_id
            FROM answers a
            JOIN users u ON a.user_id = u.user_id
            WHERE a.question_id = ?;
    `,
            [question_id]
        );

        if (!answers || answers.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({
                err: 'Not Found',
                msg: 'The requested question has no answers yet.',
            });
        }

        res.status(StatusCodes.OK).json({ answers });
    } catch (err) {
        console.error('Error fetching answers:', err); 
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            err: err.message,
            msg: 'An unexpected error occurred.',
        });
    }
};

// Post an answer to a question
const postAnswer = async function (req, res) {
    const { question_id, answer } = req.body;
    const { user_id, username } = req.user; 

    // Validate answer input
    if (!answer) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            err: 'Bad Request',
            msg: 'Please provide an answer.',
        });
    }

    if (!user_id) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            err: 'Unauthorized',
            msg: 'User not authenticated.',
        });
    }

    try {
        const answer_id = uuidv4(); 

        await connection.query(
            `
        INSERT INTO answers (answer_id, question_id, user_id, username, answer)
        VALUES (?, ?, ?, ?, ?)
    `,
            [answer_id, question_id, user_id, username, answer]
        );

        res.status(StatusCodes.CREATED).json({
            msg: 'Answer posted successfully.',
        });
    } catch (err) {
        console.error('Error posting answer:', err); 
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            err: err.message,
            msg: 'An unexpected error occurred.',
        });
    }
};

module.exports = { answerForQuestion, postAnswer };