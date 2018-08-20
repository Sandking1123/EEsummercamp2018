<template>
  <v-btn-toggle v-model="selected">
    <v-btn
      v-for="(qq, index) in quizQuestions"
      :key="qq.questionId"
      @click="chooseQuestion(index)"
      :color="answered[index] ? 'orange' : ''">Question {{ index + 1 }}</v-btn>
  </v-btn-toggle>
</template>

<script>
export default {
  props: {
    current: { type: Number, required: true },
    quizQuestions: {type: Array, required: true}
  },
  computed: {
    selected: {
      get: function () { return this.current; },
      set: function () {}
    },
    answered() {
      return this.quizQuestions.map(qq => {
        return qq.answers && qq.answers.every(answer => answer !== null);
      });
    }
  },
  methods: {
    chooseQuestion(jump) {
      this.$emit('choose', {jump});
    }
  }

};
</script>
