<template>
  <v-layout column>
    <v-flex v-for="answer in answers" :key="answer.id">
      {{ answer.text }}
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'question-card-answers',
  props: {
    answers: {type: Array, default: () => ([])}
  }
};
</script>

<style>

</style>
