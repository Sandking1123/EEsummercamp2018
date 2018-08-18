<template>
  <div>
    <h2> Summary</h2>
    {{ quizDetails }}
  </div>
</template>

<script>
import { quizApi } from '../api';
export default {
  name: 'summarycomp',
  props: {
    guizId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      quizDetails: ''
    };
  },
  created: function getDetails() {
    console.log(this.guizId);
    quizApi.getQuizDetails(this.guizId) // prop is supposed to go this.quizId
      .then((request) => {
        return request.data;
      })
      .then((details) => (this.quizDetails = details));
  }
};
</script>

<style scoped>

</style>
