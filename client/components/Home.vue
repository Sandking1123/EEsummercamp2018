<template>
  <v-container fill-height>
    <v-flex xs4 offset-xs2>
      <h1>Hello!</h1>
    </v-flex>
    <v-flex xs4 offset-xs1>
      <h1>Leaderboard</h1>
      <leaderboard />
    </v-flex>
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
