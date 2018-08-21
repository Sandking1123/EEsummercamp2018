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

function startQuizInstance({user, params}, res) {
  const userId = user.id;
  const { topic } = params;
  findQuizInstance(userId)
    // found instance, let the user decide what to do
    .then(quizInstance => res.status(302).json(quizInstance))
    // create new instance
    .catch(() => {
      createQuizInstance(userId, topic)
        .then(({id}) => findQuizDetails(id, userId))
        .then(quizDetails => res.status(201).json(quizDetails))
        .catch(err => res.status(404).send(err.message));
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

function endQuizInstance({user}, res) {
  const userId = user.id;
  findQuizInstance(userId)
    .then(({id, userId}) => findQuizDetails(id, userId))
    .then(async quizDetails => res.json(await finalizeQuiz(quizDetails)))
    .catch(err => res.status(404).send(err.message));
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

async function createQuizInstance(userId, topic) {
  const db = require('../database');
  const where = topic !== 'regular' ? {topic} : {};
  const questionIds = await Question.findAll({
    where,
    raw: true,
    attributes: ['id'],
    limit: 10,
    order: [
      [db.fn('RANDOM')]
    ]
  });

  if (questionIds.length !== 10) {
    return Promise.reject(new Error(
      `Couldn't create quiz, there is no 10 questions of topic ${topic}`
    ));
  }

  return Quiz.create({
    userId,
    topic,
    quizQuestions: questionIds.map(o => ({questionId: o.id}))
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
  answerQuestion,
  endQuizInstance
};
