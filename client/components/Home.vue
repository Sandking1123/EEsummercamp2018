<template>
  <div class="home">
    <v-app>
      <navbar></navbar>
      <history-comp></history-comp>
    </v-app>
    <footer-comp></footer-comp>
  </div>
</template>

<script>
import navbar from './Navbar';
import footerComp from './Footer';
import historyComp from './History';

export default {
  name: 'home',
  data() {
    return {
    };
  },
  components: {
    navbar,
    historyComp,
    footerComp
  }
};
</script>

<style scoped>

</style>
