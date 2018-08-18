<template>
  <div class="home">
    <navbar></navbar>
  </div>
</template>

<script>
import navbar from './Navbar';

export default {
  name: 'home',
  history: false,
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
