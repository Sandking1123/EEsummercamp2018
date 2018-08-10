const Quiz = require('./quiz.model');

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

module.exports = {
  getQuizzes,
  getQuizDetails,
  retrieveQuizInstance
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
