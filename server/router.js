const express = require('express');
const questionRouter = require('./question');
const quizRouter = require('./quiz');

const router = express.Router();
router.use('/', questionRouter);
router.use('/', quizRouter);

module.exports = router;
