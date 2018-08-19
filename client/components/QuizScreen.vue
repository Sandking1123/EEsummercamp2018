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
        v-if="quizQuestions[current] && quizQuestions[current].question"
        @set-answer="setAnswer"
        :full-question="quizQuestions[current].question"
        :current-answers="quizQuestions[current].answers" />
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
      quizQuestions: []
    };
  },
  methods: {
    setAnswer(answerIndex, answerId) {
      const newAnswers = this.quizQuestions[this.current].answers.slice();
      newAnswers.forEach((id, index, array) => {
        if (id === answerId) {
          array[index] = null;
        }
      });
      newAnswers[answerIndex] = answerId;
      // trigger update
      this.quizQuestions[this.current].answers = newAnswers;
    },
    fetchQuestion(id) {
      questionApi.getQuestion(id)
        .then(response => response.data)
        .then(question => {
          const qq = this.quizQuestions.find(qq => qq.questionId === id);
          if (qq.answers === null) {
            const noAnswers = (question.question.match(/\?\?\?/g) || []).length;
            qq.answers = new Array(noAnswers).fill(null);
          }
          qq.question = question;
          this.$forceUpdate();
        });
    },
    sendAnswer(finalize) {
      const current = this.quizQuestions[this.current];
      return quizApi.answerQuestion(current.questionId, current.answers, finalize);
    },
    changeQuestion(step) {
      const nextPos = this.current + step;
      if (nextPos >= 0 && nextPos < this.quizQuestions.length) {
        this.sendAnswer();
        this.current = nextPos;
      } else if (nextPos === this.quizQuestions.length) {
        // TODO: alert user that this will end the quiz
        this.sendAnswer(true)
          .then(({data}) => console.log(data))
          // TODO: go to summary
          .then(() => this.$router.replace('history'));
      }
    }
  },
  created: function startQuiz() {
    quizApi.createInstance()
      .catch(error => {
        if (error.response && error.response.status === 302) {
          // TODO prompt user to choose what to to
          return quizApi.getInstance();
        } else {
          return Promise.reject(error);
        }
      })
      .then(response => response.data)
      .then(({quizQuestions}) => {
        this.quizQuestions = quizQuestions;
        const promises = quizQuestions.map(qq => {
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
