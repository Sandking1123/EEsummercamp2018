const router = require('express').Router();
const controller = require('./question.controller');

router.get('/questions/:id', controller.getQuestion);

module.exports = router;
