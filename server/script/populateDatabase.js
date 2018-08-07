// const syncDB = require('./syncDatabase');
const Question = require('../question/question.model');
const fs = require('fs');

const questions = JSON.parse(fs.readFileSync('questions.json', 'utf8'));
Question.bulkCreate(questions);
