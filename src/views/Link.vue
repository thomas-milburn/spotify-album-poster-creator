<template>
  <div>
    <h1>Link your Spotify account</h1>

    <spotify-button text="Link Spotify account" @click="linkedAccount" />
  </div>
</template>

<script>
import SpotifyButton from "../components/SpotifyButton";

export default {
  name: "Link",
  components: {SpotifyButton},
  methods: {
    linkedAccount() {
      // Creating the url which the user will be redirected to
      const redirectUrl = new URL(window.location.href);
      redirectUrl.pathname = "/oauth-callback"

      // Generating a random cookie for state that can be verified
      const stateValue = Math.random()*100000000 + ""
      document.cookie = `state=${stateValue}`

      // Building oauth url
      const oauthUrl = new URL("https://accounts.spotify.com/authorize");
      oauthUrl.searchParams.append("client_id", process.env.VUE_APP_SPOTIFY_CLIENT_ID);
      oauthUrl.searchParams.append("state", stateValue)
      oauthUrl.searchParams.append("response_type", "token")
      oauthUrl.searchParams.append("redirect_uri", redirectUrl.toString())

      window.location = oauthUrl.toString()
    }
  }
};
</script>

<style scoped>

</style>