<template>
  <div>
    <br>
    <h2> Summary of Quiz {{ index }}</h2>
    {{ quizDetails }}
  </div>
</template>

<script>
import { quizApi } from '../api';
export default {
  name: 'summarycomp',
  props: {
    quizId: { type: Number, required: true },
    index: { type: Number, required: true }
  },
  data() {
    return {
      quizDetails: ''
    };
  },
  updated() {
    //
  },
  created: function getDetails() {
    console.log(this.quizId);
    quizApi.getQuizDetails(this.quizId) // prop is supposed to go this.quizId
      .then((request) => {
        return request.data;
      })
      .then((details) => (this.quizDetails = details));
  }
};
</script>

<style scoped>

</style>
