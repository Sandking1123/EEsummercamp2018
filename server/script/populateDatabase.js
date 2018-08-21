const Question = require('../question/question.model');
const database = require('../database');
const fs = require('fs');

const questions = JSON.parse(fs.readFileSync('questions.json', 'utf8'));
questions.forEach(q => {
  q.answers = q.answers.map((answer, index) => {
    answer.id = index;
    return answer;
  });
});
Question.bulkCreate(questions).then(() => database.close());
