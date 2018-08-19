<template>
  <v-container align-center fill-height>
    <v-flex>
      <v-btn
        @click="changeQuestion(-1)"
        flat
        color="orange">Previous</v-btn>
    </v-flex>
    <v-flex xs6>
      <question-card
        v-if="questions.length > 0"
        @set-answer="setAnswer"
        :full-question="questions[current].question"
        :current-answers="questions[current].answers" />
    </v-flex>
    <v-flex>
      <v-btn
        @click="changeQuestion(1)"
        flat
        color="orange">Next</v-btn>
    </v-flex>
  </v-container>
</template>

<script>
import questionCard from './QuestionCard';
import { questionApi, quizApi } from '../api';

export default {
  name: 'quiz-screen',
  data() {
    return {
      current: 0,
      questions: [],
      quiz: {}
    };
  },
  methods: {
    setAnswer(answerIndex, answerId) {
      const newAnswers = this.questions[this.current].answers.slice();
      newAnswers.forEach((id, index, array) => {
        if (id === answerId) {
          array[index] = null;
        }
      });
      newAnswers[answerIndex] = answerId;
      // trigger update
      this.questions[this.current].answers = newAnswers;
    },
    fetchQuestion(id) {
      questionApi.getQuestion(id)
        .then(response => response.data)
        .then(question => {
          const noAnswers = (question.question.match(/\?\?\?/g) || []).length;
          const answers = new Array(noAnswers).fill(null);
          this.questions.push({question, answers});
        });
    },
    changeQuestion(step) {
      const nextPos = this.current + step;
      if (nextPos >= 0 && nextPos < this.questions.length) {
        this.current = nextPos;
      }
    }
  },
  created: function startQuiz() {
    quizApi.createInstance()
      .then(response => response.data)
      .catch(error => {
        if (error.response && error.response.status === 302) {
          // TODO prompt user to choose what to to
          return quizApi.getInstance();
        } else {
          return Promise.reject(error);
        }
      })
      .then(response => response.data)
      .then(quiz => {
        this.quiz = quiz;
        const promises = quiz.quizQuestions.map(qq => {
          return this.fetchQuestion(qq.questionId);
        });
        return Promise.all(promises);
      });
    // TODO handle errors
  },
  components: {
    questionCard
  }
};
</script>
