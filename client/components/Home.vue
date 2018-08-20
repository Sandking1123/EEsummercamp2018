<template>
  <v-container fill-height>
    <v-flex>
      <mainmenu></mainmenu>
    </v-flex>
    <v-flex xs4 offset-xs1>
      <h1>Leaderboard</h1>
      <leaderboard />
    </v-flex>
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
