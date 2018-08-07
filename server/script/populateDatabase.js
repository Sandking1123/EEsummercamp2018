const Question = require('../question/question.model');
const database = require('../database');
const fs = require('fs');

const questions = JSON.parse(fs.readFileSync('questions.json', 'utf8'));
Question.bulkCreate(questions).then(() => database.close());
