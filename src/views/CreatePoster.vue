<template>
  <div>
    <h1>Create poster</h1>
    <p>{{ $root.accessToken }}</p>
  </div>
</template>

<script>
export default {
  name: "CreatePoster",
  mounted() {
    if (this.$root.accessToken == null) {
      this.$router.push({"name": "Link"})
      return;
    }
  }
};
</script>

<style scoped>

</style>