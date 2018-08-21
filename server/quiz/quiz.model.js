const Sequelize = require('sequelize');
const database = require('../database');

const Quiz = database.define('quiz', {
  percentage: Sequelize.DOUBLE,
  timestamp: Sequelize.DATE,
  topic: Sequelize.STRING
});

// set relations
const User = require('../user/user.model');
const Question = require('../question/question.model');

// 1 to N
Quiz.belongsTo(User, {foreignKey: 'userId'});
User.hasMany(Quiz, {foreignKey: 'userId'});

// N to M
// creates new table quizQuestions with these additional columns
Quiz.Questions = database.define('quizQuestions', {
  correct: Sequelize.BOOLEAN,
  answers: Sequelize.ARRAY(Sequelize.INTEGER)
});
Question.belongsToMany(Quiz, {through: Quiz.Questions});
Quiz.belongsToMany(Question, {through: Quiz.Questions});
// so we can join (include) quiz and quizQuestions tables
Quiz.hasMany(Quiz.Questions);
Quiz.Questions.belongsTo(Quiz);

module.exports = Quiz;
