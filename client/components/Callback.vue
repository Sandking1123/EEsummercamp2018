<script>
export default {
  name: 'callback',
  mounted() {
    this.$auth.handleAuthentication().then((data) => {
      this.$router.replace({ name: 'home' });
    });
  }
};
</script>
