const router = require('express').Router();
const controller = require('./quiz.controller');

// answer question / finish quiz
router.put('/quizzes/instance/question/:id', controller.answerQuestion);
// start/resume quiz
router.get('/quizzes/instance', controller.retrieveQuizInstance);
router.post('/quizzes/instance', controller.startQuizInstance);
// review
router.get('/quizzes/:id', controller.getQuizDetails);
// history
router.get('/quizzes', controller.getQuizzes);

module.exports = router;
