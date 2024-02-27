const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// Routes for questions
router.post('/create', questionController.createQuestion);
router.get('/:id', questionController.getQuestionById);

module.exports = router;
