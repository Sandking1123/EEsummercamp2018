<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs4 offset-xs4>
        <h1>Leaderboard</h1>
      </v-flex>
      <v-flex xs4 offset-xs4>
        <leaderboard />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import leaderboard from './Leaderboard';

export default {
  name: 'home',
  data() {
    return {
    };
  },
  components: {
    leaderboard
  }
};
</script>
