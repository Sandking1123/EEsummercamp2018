<template>
  <div>
    <v-progress-linear v-model="valueDeterminate"></v-progress-linear>
    <v-btn-toggle v-model="toggle_exclusive">
      <v-btn id="q1" color="">Question 1</v-btn>
      <v-btn id="q2" color="">Question 2</v-btn>
      <v-btn id="q3" color="">Question 3</v-btn>
      <v-btn id="q4" color="">Question 4</v-btn>
      <v-btn id="q5" color="">Question 5</v-btn>
      <v-btn id="q6" color="">Question 6</v-btn>
      <v-btn id="q7" color="">Question 7</v-btn>
      <v-btn id="q8" color="">Question 8</v-btn>
      <v-btn id="q9" color="">Question 9</v-btn>
      <v-btn id="q10" color="">Question 10</v-btn>
    </v-btn-toggle>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valueDeterminate: 50,
      toggle_exclusive: 2
    };
  }
};
</script>
