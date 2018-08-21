<template>
  <v-container>
    <v-layout row wrap>
      <v-flex>
        <panel />
      </v-flex>
      <v-flex xs4>
        <h1>Leaderboard</h1>
        <leaderboard />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import leaderboard from './Leaderboard';
import panel from './Panel';

export default {
  name: 'home',
  data() {
    return {
    };
  },
  components: {
    leaderboard,
    panel
  }
};
</script>
