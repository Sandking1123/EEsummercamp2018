const router = require('express').Router();
const controller = require('./question.controller');

router.get('/questions/topics/:topic', controller.getQuestionsOfSpecificTopic);
router.get('/questions/topics', controller.getTopics);
router.get('/questions/:id', controller.getQuestion);

module.exports = router;
