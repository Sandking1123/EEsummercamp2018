<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs4 offset-xs7>
        <h1>Leaderboard</h1>
      </v-flex>
      <v-flex xs2 offset-xs2>
        <mainmenu></mainmenu>
      </v-flex>
      <v-flex xs4 offset-xs3>
        <leaderboard />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import leaderboard from './Leaderboard';
import mainmenu from './MainMenu';

export default {
  name: 'home',
  data() {
    return {
    };
  },
  components: {
    leaderboard,
    mainmenu
  }
};
</script>
