<template>
  <v-layout column>
    <v-flex
      v-for="answer in answers"
      :key="answer.id"
      @click="setAnswer(answer.id)">
      <v-btn class="btn" flat color="black">{{ answer.text }}</v-btn>
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

<style scoped>
  .btn {
    text-transform: none
  }
</style>
