<template>
  <div>
    <br>
    <h2> Summary of Quiz {{ index }}</h2>
    {{ quizId }} {{ quizDetails }}
  </div>
</template>

<script>
// import { quizApi } from '../api';
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
  watch: {
    quizId: function (val, oldVal) {
      // run a method to change quizdetails value
      // function getDetails() {
      //   console.log(val);
      //   quizApi.getQuizDetails(val) // prop is supposed to go this.quizId
      //     .then((request) => {
      //       return request.data;
      //     })
      //     .then((details) => (this.quizDetails = details));
      // }
      console.log(this.quizDetails);
    }
  }
  // updated: function getDetails() {
  //   return quizApi.getQuizDetails(this.quizId) // prop is supposed to go this.quizId
  //     .then((request) => {
  //       return request.data;
  //     })
  //     .then((details) => {
  //       this.quizDetails = details;
  //       return this.quizDetails;
  //     });
  // }
};
</script>

<style scoped>

</style>
