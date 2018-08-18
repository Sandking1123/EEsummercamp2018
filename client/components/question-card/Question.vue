<template>
  <v-container fill-height fluid>
    <v-flex>
      <span v-for="(bit, index) in splittedQuestion" :key="index">
        {{ bit }}
        <v-chip
          v-if="index+1 < splittedQuestion.length"
          @click="select(index)"
          label
          :outline="index != selectedAnswer"
          color="orange">
          {{ markedAnswers[index] }}
        </v-chip>
      </span>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  name: 'question-card-question',
  props: {
    question: {type: String, required: true},
    markedAnswers: {type: Array, required: true},
    selectedAnswer: {type: Number, required: true}
  },
  computed: {
    splittedQuestion: function split() {
      return this.question.split('???');
    }
  },
  methods: {
    select(id) {
      this.$emit('select', id);
    }
  }
};
</script>

<style>

</style>
