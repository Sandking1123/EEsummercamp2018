<template>
  <v-layout column>
    <v-flex
      v-for="answer in answers"
      :key="answer.id"
      @click="setAnswer(answer.id)">
      {{ answer.text }}
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'question-card-answers',
  props: {
    answers: {type: Array, default: () => ([])}
  },
  methods: {
    setAnswer(answerId) {
      this.$emit('set-answer', answerId);
    }
  }
};
</script>
