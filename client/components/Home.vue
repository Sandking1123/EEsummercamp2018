<template>
  <div class="home">
    <v-app>
      <navbar></navbar>
      <history-comp></history-comp>
      <summary-comp></summary-comp>
    </v-app>
    <footer-comp></footer-comp>
  </div>
</template>

<script>
import navbar from './Navbar';
import footerComp from './Footer';
import historyComp from './History';
import summaryComp from './Summary';

export default {
  name: 'home',
  data() {
    return {
    };
  },
  components: {
    navbar,
    historyComp,
    summaryComp,
    footerComp
  }
};
</script>

<style scoped>

</style>
