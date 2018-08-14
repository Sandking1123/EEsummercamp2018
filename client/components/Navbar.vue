<template>
  <nav class="navbar navbar-dark bg-dark">
    <a class="navbar-brand" href="#">
      <img src="https://a.storyblok.com/f/39898/1024x1024/dea4e1b62d/vue-js_logo-svg.png" width="40" height="40">
    </a>
    <div>
      <img class="img-rounded" :src="$auth.user.picture" width="30" height="30">
      <span class="text-white font-weight-light px-2">{{ $auth.user.name }}</span>
      <button @click="$auth.logout()" type="button" class="btn text-light btn-outline-secondary btn-sm">Logout</button>
    </div>
  </nav>
</template>

<script>
export default {

};
</script>
<style scoped>
@import url('https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css');

</style>
