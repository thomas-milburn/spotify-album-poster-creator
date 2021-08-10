<template>

</template>

<script>
import {getCookie, setCookie} from "../assets/js/util";

export default {
  name: "OauthCallback",
  mounted() {
    let routeHash = this.$route.hash;

    // Parsing hash
    routeHash = routeHash.replace("#", "");
    const routeHashParts = routeHash.split("&");

    const routeHashDict = {};

    for (const param of routeHashParts) {
      // Each part should look like access_token=xyz

      const paramParts = param.split("=");
      if (paramParts.length !== 2) {
        continue;
      }

      routeHashDict[paramParts[0]] = paramParts[1];
    }

    // routeHashDict should now contain all the params passed to us from Spotify
    if (!("access_token" in routeHashDict && "state" in routeHashDict && "expires_in" in routeHashDict)) {
      this.$router.push({"name": "link"});
      return;
    }

    // Checking state to against cookie to prevent cross-site request forgery
    const stateCookie = getCookie("state");
    if (routeHashDict["state"] !== stateCookie) {
      this.$router.push({"name": "link"});
      return;
    }

    setCookie("spotify-access-token", routeHashDict["access_token"], routeHashDict["expires_in"])

    this.$root.accessToken = routeHashDict["access_token"]
    this.$router.push({"name": "createPoster"});
  }
};
</script>

<style scoped>

</style>