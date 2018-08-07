const database = require('../database');

// create models
require('../question/question.model');
const User = require('../user/user.model');
const Quiz = require('../quiz/quiz.model');

// set relations
Quiz.belongsTo(User, {foreignKey: 'userId'});

// sync database
database.sync({force: true})
  .then(() => database.close());
