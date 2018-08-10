const Sequelize = require('sequelize');
const database = require('../database');

const Quiz = database.define('quiz', {
  percentage: Sequelize.DOUBLE,
  timestamp: Sequelize.DATE,
  elapsedTime: Sequelize.INTEGER
});

// set relations
const User = require('../user/user.model');
const Question = require('../question/question.model');

// 1 to N
Quiz.belongsTo(User, {foreignKey: 'userId'});
User.hasMany(Quiz, {foreignKey: 'userId'});

// N to M
// creates new table quizQuestions with these additional columns
const QuizQuestions = database.define('quizQuestions', {
  correct: Sequelize.BOOLEAN,
  answers: Sequelize.ARRAY(Sequelize.INTEGER)
});
Question.belongsToMany(Quiz, {through: QuizQuestions});
Quiz.belongsToMany(Question, {through: QuizQuestions});

module.exports = Quiz;
