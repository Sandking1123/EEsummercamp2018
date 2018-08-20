<template>
  <div>
    <v-btn-toggle v-model="current">
      <v-btn @click="chooseQuestion(0)" id="q1" color="">Question 1</v-btn>
      <v-btn @click="chooseQuestion(1)" id="q2" color="">Question 2</v-btn>
      <v-btn @click="chooseQuestion(2)" id="q3" color="">Question 3</v-btn>
      <v-btn @click="chooseQuestion(3)" id="q4" color="">Question 4</v-btn>
      <v-btn @click="chooseQuestion(4)" id="q5" color="">Question 5</v-btn>
      <v-btn @click="chooseQuestion(5)" id="q6" color="">Question 6</v-btn>
      <v-btn @click="chooseQuestion(6)" id="q7" color="">Question 7</v-btn>
      <v-btn @click="chooseQuestion(7)" id="q8" color="">Question 8</v-btn>
      <v-btn @click="chooseQuestion(8)" id="q9" color="">Question 9</v-btn>
      <v-btn @click="chooseQuestion(9)" id="q10" color="">Question 10</v-btn>
    </v-btn-toggle>
  </div>
</template>

<script>
export default {
  props: {
    current: { type: Number, required: true }
  },
  methods: {
    chooseQuestion(jump) {
      this.$emit('choose', {jump});
    }
  }

};
</script>
