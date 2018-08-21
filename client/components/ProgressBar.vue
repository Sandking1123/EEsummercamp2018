<template>
  <v-btn-toggle v-model="selected">
    <v-btn
      v-for="(qq, index) in quizQuestions"
      :key="qq.questionId"
      @click="chooseQuestion(index)"
      :color="color[index]">Question {{ index + 1 }}</v-btn>
  </v-btn-toggle>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'progress-bar',
  props: {
    mode: {type: String, default: 'quiz'},
    current: { type: Number, required: true },
    quizQuestions: {type: Array, required: true}
  },
  data() {
    return {
      colorAnswerd: 'orange',
      colorCorrect: 'light-green',
      colorWrong: 'red'
    };
  },
  computed: {
    selected: {
      get: function () { return this.current; },
      set: function () {}
    },
    color() {
      return this.quizQuestions.map(qq => {
        let color;
        if (!qq.answers || !qq.question) {
          color = '';
        } else if (this.mode === 'review') {
          const correct = qq.answers.every((answer, index) => {
            const corr = _.find(qq.question.answers, {correctIndex: index});
            return answer === corr.id;
          });
          color = correct ? this.colorCorrect : this.colorWrong;
        } else if (this.mode === 'quiz') {
          const answered = qq.answers.every(answer => answer !== null);
          color = answered ? this.colorAnswerd : '';
        }
        return color;
      });
    }
  },
  methods: {
    chooseQuestion(jump) {
      this.$emit('choose', {jump});
    }
  }
};
</script>
