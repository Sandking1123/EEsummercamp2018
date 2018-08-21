const Quiz = require('./quiz.model');
const Question = require('../question/question.model');

function getQuizzes({user}, res) {
  const userId = user.id;
  Quiz.findAll({
    where: {userId},
    order: [['timestamp', 'DESC']],
    raw: true})
    .then((quizzes) => res.json(quizzes))
    .catch((err) => res.status(404).send(err.message));
}

function getQuizDetails({user, params}, res) {
  const userId = user.id;
  findQuizDetails(params.id, userId)
    .then(quizDetails => res.json(quizDetails))
    .catch((err) => res.status(404).send(err.message));
}

function retrieveQuizInstance({user}, res) {
  const userId = user.id;
  findQuizInstance(userId)
    .then(({id, userId}) => findQuizDetails(id, userId))
    .then(quizDetails => res.json(quizDetails))
    .catch((err) => res.status(404).send(err.message));
}

function startQuizInstance({user}, res) {
  const userId = user.id;
  findQuizInstance(userId)
    // found instance, let the user decide what to do
    .then(quizInstance => res.status(302).json(quizInstance))
    // create new instance
    .catch(() => {
      createQuizInstance(userId)
        .then(({id}) => findQuizDetails(id, userId))
        .then(quizDetails => res.status(201).json(quizDetails))
        .catch((err) => res.status(401).json(err));
    });
}

function answerQuestion({user, params, body}, res) {
  const userId = user.id;
  const questionId = parseInt(params.id);
  const answers = body.answers;
  const finalize = body.finalize;

  // bad request
  if (!answers || answers.length === 0 || isNaN(questionId)) {
    res.sendStatus(400);
    return;
  }

  findQuizInstance(userId)
    .then(({id, userId}) => findQuizDetails(id, userId))
    // update answer to quiz question
    .then(async quizDetails => {
      const quizQuestion = quizDetails.quizQuestions.find(quizQuestion => {
        return quizQuestion.questionId === questionId;
      });
      if (!quizQuestion) {
        return Promise.reject(new Error('Question not part of the instance'));
      }

      // update quizQuestion table with users answer
      const question = await Question.findOne({where: {id: questionId}});
      const correctAnswers = question.correctAnswers();

      const correct = answers.every((answerIndex, index) => {
        return answerIndex === correctAnswers[index];
      }) && answers.length === correctAnswers.length;

      await quizQuestion.update({
        correct,
        answers
      });

      // continue
      return Promise.resolve(quizDetails);
    })
    .then(async quizDetails => {
      if (finalize) {
        // return summary of finished quiz
        res.json(await finalizeQuiz(quizDetails));
      } else {
        // confirm answer
        res.sendStatus(204);
      }
    })
    .catch((err) => res.status(404).send(err.message));
}

/*
 *  Helper functions
 */

async function findQuizDetails(quizId, userId) {
  const quizDetails = await Quiz.findOne({
    where: {
      id: quizId,
      userId
    },
    include: [{
      model: Quiz.Questions
    }],
    order: [
      [Quiz.Questions, 'questionId', 'asc']
    ]
  });

  if (quizDetails == null) {
    return Promise.reject(new Error('Quiz not found'));
  } else {
    return Promise.resolve(quizDetails);
  }
}

async function findQuizInstance(userId) {
  // check if there is non-finished quiz (percentage no set)
  const quizInstance = await Quiz.findOne({
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

function finalizeQuiz(quizDetails) {
  let percentage = 0;
  quizDetails.quizQuestions.forEach(quizQuestion => {
    percentage += quizQuestion.correct ? 1 : 0;
  });

  return quizDetails.update({
    percentage,
    timestamp: Date.now()
  });
}

module.exports = {
  getQuizzes,
  getQuizDetails,
  retrieveQuizInstance,
  startQuizInstance,
  answerQuestion
};
