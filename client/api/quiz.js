import request from './request';

function getHistory() {
  return request.get('/quizzes');
}

function getQuizDetails(quizId) {
  return request.get(`/quizzes/${quizId}`);
}

function getInstance() {
  return request.get('/quizzes/instance');
}

function createInstance() {
  return request.post('/quizzes/instance');
}

function answerQuestion(questionId, answers, finalize) {
  return request.put(`/quizzes/instance/question/${questionId}`, {
    answers,
    finalize
  });
}

export default {
  getHistory,
  getQuizDetails,
  getInstance,
  createInstance,
  answerQuestion
};
