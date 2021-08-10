<template>
  <div>
    <h1>Create poster</h1>
  </div>
</template>

<script>
import {searchSpotify} from "../assets/js/spotify-util";

export default {
  name: "CreatePoster",
  mounted() {
    searchSpotify("Hello").then((json) => {
      console.log(json)
    })
  }
};
</script>

<style scoped>

</style>