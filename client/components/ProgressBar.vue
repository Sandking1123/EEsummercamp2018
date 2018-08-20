<template>
  <v-btn-toggle v-model="current">
    <v-btn
      v-for="(qq, index) in quizQuestions"
      :key="qq.questionId"
      @click="chooseQuestion(index)"
      color="">Question {{ index + 1 }}</v-btn>
  </v-btn-toggle>
</template>

<script>
export default {
  props: {
    current: { type: Number, required: true },
    quizQuestions: {type: Array, required: true}
  },
  methods: {
    chooseQuestion(jump) {
      this.$emit('choose', {jump});
    }
  }

};
</script>
