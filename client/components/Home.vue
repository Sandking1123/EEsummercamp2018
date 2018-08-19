<template>
  <div class="home">
    <v-app>
      <navbar></navbar>
    </v-app>
    <footer-comp></footer-comp>
  </div>
</template>

<script>
import navbar from './Navbar';
import footerComp from './Footer';

export default {
  name: 'home',
  data() {
    return {
    };
  },
  components: {
    navbar,
    footerComp
  }
};
</script>
