<template>

</template>

<script>
import {getCookie} from "../assets/js/util";

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

    if (!("access_token" in routeHashDict && "state" in routeHashDict)) {
      this.$router.push({"name": "Link"});
      return;
    }

    // Checking state to against cookie to prevent cross-site request forgery
    const stateCookie = getCookie("state");
    if (routeHashDict["state"] !== stateCookie) {
      this.$router.push({"name": "Link"});
      return;
    }

    this.$root.accessToken = routeHashDict["access_token"]
    this.$router.push({"name": "CreatePoster"});
  }
};
</script>

<style scoped>

</style>