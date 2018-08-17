<template>
  <div class="dashboard">
    <v-app>
      <navbar></navbar>
      <!-- <button @click="doMe">btn</button> -->
      <history></history>
    </v-app>
  </div>
</template>

<script>
import navbar from './Navbar';
// for testing
import history from './History';

export default {
  name: 'app',
  data() {
    return {
    };
  },
  methods: {
    doMe() {
      console.log(this.$auth.token);
    }
  },
  components: {
    navbar,
    history
  }
};
</script>

<style scoped>

</style>
