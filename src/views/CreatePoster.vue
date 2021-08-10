<template>
  <div>
    <h1>Create poster</h1>
    <p>{{ accessToken }}</p>
  </div>
</template>

<script>
import {getSpotifyAccessToken} from "../assets/js/util";

export default {
  name: "CreatePoster",
  computed: {
    accessToken() {
      return getSpotifyAccessToken()
    }
  }
};
</script>

<style scoped>

</style>