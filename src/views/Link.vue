<template>
  <div>
    <h1>Link your Spotify account</h1>

    <spotify-button text="Link Spotify account" @click="linkedAccount"/>
  </div>
</template>

<script>
import SpotifyButton from "../components/SpotifyButton";
import {getOauthUrl} from "../assets/js/spotify-util";

export default {
  name: "Link",
  components: {SpotifyButton},
  methods: {
    linkedAccount() {
      // Creating the url which the user will be redirected to
      window.location = getOauthUrl();
    }
  }
};
</script>

<style scoped>

</style>