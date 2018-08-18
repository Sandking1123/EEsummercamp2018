<template>
  <div>
    <h3> SUMMARY</h3>
  </div>
</template>

<script>
import { quizApi } from '../api';
export default {
  name: 'summaryofquiz',
  data() {
    //
    return {
      quizDetails: ''
    };
  },
  created: function getDetails() {
    quizApi.getQuizDetails(1)
      .then((request) => {
        console.log(request.data);
        return request.data;
      })
      .then((details) => (this.quizDetails = details));
  }
};
</script>

<style scoped>

</style>
