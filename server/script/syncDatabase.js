const database = require('../database');

// create models
require('../question/question.model');
require('../user/user.model');
require('../quiz/quiz.model');

// sync database
database.sync({force: true})
  .then(() => database.close());
