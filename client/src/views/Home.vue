<template>
  <div class="dashboard">
    <nav class="navbar navbar-dark bg-dark">
      <a class="navbar-brand" href="#">
        <img src="https://a.storyblok.com/f/39898/1024x1024/dea4e1b62d/vue-js_logo-svg.png" width="40" height="40">
      </a>
      <div>
        <img :src="$auth.user.picture" width="30" height="30">
        <span class="text-muted font-weight-light px-2">{{ $auth.user.name }}</span>
        <button @click="$auth.logout()" type="button" class="btn btn-outline-secondary btn-sm">Logout</button>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      stories: []
    };
  },
  methods: {
    getStoryLink(story) {
      return `https://www.storyblok.com/${story.full_slug}`;
    }
  },
  mounted() {
    axios.get('https://api.storyblok.com/v1/cdn/stories?starts_with=tp&excluding_fields=body&excluding_ids=48471,48547,60491&token=dtONJHwmxhdJOwKxyjlqAgtt').then((res) => {
      this.stories = res.data.stories;
    });
  }
};
</script>

<style scoped>
@import url('https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css');

.btn-primary {
  background: #468f65;
  border: 1px solid #468f65;
}
.card {
  text-decoration: none;
  color: #000;
}
</style>
