import request from './request';

function getQuestionsOfSpecificTopic(topic) {
  return request.get(`/questions/topics/${topic}`);
}

function getTopics() {
  return request.get('/questions/topics');
}

export default {
  getQuestionsOfSpecificTopic,
  getTopics
};
