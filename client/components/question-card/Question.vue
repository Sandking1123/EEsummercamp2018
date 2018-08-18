<template>
  <v-container fill-height fluid>
    <v-flex>
      {{ question }}
    </v-flex>
  </v-container>
</template>

<script>
export default {
  name: 'question-card-question',
  props: {
    question: {type: String, default: ''}
  }
};
</script>

<style>

</style>
