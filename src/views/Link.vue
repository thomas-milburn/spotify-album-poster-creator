<template>
  <div>
    <h1>Link your Spotify account</h1>

    <spotify-button text="Link Spotify account" />
  </div>
</template>

<script>
import SpotifyButton from "../components/spotify-button";
export default {
  name: "Link",
  components: {SpotifyButton}
};
</script>

<style scoped>

</style>