const Quiz = require('./quiz.model');
const Question = require('../question/question.model');

function getQuizzes(req, res) {
  const userId = req.userId;
  Quiz.findAll({where: {userId}, raw: true})
    .then((quizzes) => res.json(quizzes))
    .catch(() => res.status(404).json({}));
}

function getQuizDetails(req, res) {
  const userId = req.userId;
  findQuizDetails(req.params.id, userId)
    .then(quizDetails => res.json(quizDetails))
    .catch(() => res.status(404).json({}));
}

function retrieveQuizInstance(req, res) {
  const userId = req.userId;
  findQuizInstance(userId)
    .then(quizInstance => findQuizDetails(quizInstance.id, quizInstance.userId))
    .then(quizDetails => res.json(quizDetails))
    .catch(() => res.status(404).json({}));
}

function startQuizInstance(req, res) {
  const userId = req.userId;
  findQuizInstance(userId)
    // found instance, let the user decide what to do
    .then(quizInstance => res.status(302).json(quizInstance))
    // create new instance
    .catch(() => {
      createQuizInstance(userId)
        .then(createdQuizInstance => res.status(201).json(createdQuizInstance))
        .catch((err) => res.status(401).json(err));
    });
}

module.exports = {
  getQuizzes,
  getQuizDetails,
  retrieveQuizInstance,
  startQuizInstance
};

async function findQuizDetails(quizId, userId) {
  const quizDetails = await Quiz.find({
    where: {
      id: quizId,
      userId
    },
    include: [{
      model: Quiz.Questions
    }]
  });

  if (quizDetails == null) {
    return Promise.reject(new Error('Quiz not found'));
  } else {
    return Promise.resolve(quizDetails);
  }
}

async function findQuizInstance(userId) {
  // check if there is non-finished quiz (percentage no set)
  const quizInstance = await Quiz.find({
    where: {
      userId,
      percentage: null
    }
  });

  if (quizInstance == null) {
    return Promise.reject(new Error('Quiz instance not found'));
  } else {
    return Promise.resolve(quizInstance);
  }
}

async function createQuizInstance(userId) {
  const randomInt = require('random-int');
  const count = await Question.count();
  const questions = [];
  while (questions.length < 10) {
    let id;
    while (questions.includes(id = randomInt(1, count))) {}
    questions.push(id);
  }

  return Quiz.create({
    userId,
    quizQuestions: questions.map(questionId => ({questionId}))
  }, {
    include: [Quiz.Questions]
  });
}
