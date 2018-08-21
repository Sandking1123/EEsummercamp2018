<template>
  <v-container fill-height fluid>
    <v-flex>
      <span v-for="(bit, index) in splittedQuestion" :key="index">
        {{ bit }}
        <v-chip
          v-if="index+1 < splittedQuestion.length"
          @click="select(index)"
          label
          :outline="index != selectedAnswer"
          :color="colors[index]">
          {{ displayAnswers[index] }}
        </v-chip>
      </span>
    </v-flex>
  </v-container>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'question-card-question',
  props: {
    fullQuestion: {type: Object, required: true},
    markedAnswers: {type: Array, required: true},
    selectedAnswer: {type: Number, required: true},
    displayOptions: {type: Object, required: true}
  },
  data() {
    return {
      colorDefault: 'orange',
      colorCorrect: 'light-green',
      colorWrong: 'red'
    };
  },
  computed: {
    splittedQuestion() {
      return this.fullQuestion.question.split('???');
    },
    displayAnswers() {
      if (this.displayOptions.marked) {
        return this.markedAnswers;
      } else {
        const answers = this.fullQuestion.answers;
        return _.map(
          _.sortBy(_.filter(answers, a => a.correct), 'correctIndex'),
          a => a.text
        );
      }
    },
    colors() {
      if (this.displayOptions.mode === 'quiz') {
        return _.map(this.markedAnswers, () => this.colorDefault);
      } else if (this.displayOptions.marked) {
        const answers = this.fullQuestion.answers;
        const correctAnswers = _.sortBy(_.filter(answers, a => a.correct), 'id');
        return _.map(correctAnswers, (a) => {
          const color = a.text === this.markedAnswers[a.id]
            ? this.colorCorrect : this.colorWrong;
          return color;
        });
      } else {
        const answers = this.fullQuestion.answers;
        return _.map(_.filter(answers, a => a.correct), () => this.colorCorrect);
      }
    }
  },
  methods: {
    select(id) {
      this.$emit('select', id);
    }
  }
};
</script>
