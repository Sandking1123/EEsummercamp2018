const router = require('express').Router();
const controller = require('./question.controller');

router.get('/question/:id', controller.getQuestion);

module.exports = router;
