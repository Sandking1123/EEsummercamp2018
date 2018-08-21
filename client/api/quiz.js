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

function createInstance(topic = 'regular') {
  return request.post(`/quizzes/instance/${topic}`);
}

function answerQuestion(questionId, answers, finalize) {
  return request.put(`/quizzes/instance/question/${questionId}`, {
    answers,
    finalize
  });
}

function endInstance() {
  return request.post('/quizzes/instance/end');
}

export default {
  getHistory,
  getQuizDetails,
  getInstance,
  createInstance,
  answerQuestion,
  endInstance
};
