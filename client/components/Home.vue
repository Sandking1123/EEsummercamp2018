<template>
  <div class="home">
    <v-app>
      <navbar></navbar>
    </v-app>
  </div>
</template>

<script>
import navbar from './Navbar';

export default {
  name: 'home',
  data() {
    return {
    };
  },
  components: {
    navbar
  }
};
</script>

<style scoped>

</style>
