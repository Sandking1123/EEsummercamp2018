const express = require('express');
const questionRouter = require('./question');
const quizRouter = require('./quiz');
const userRouter = require('./user');

const router = express.Router();
router.use('/', questionRouter);
router.use('/', quizRouter);
router.use('/', userRouter);

module.exports = router;
