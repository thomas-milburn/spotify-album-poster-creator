<template>
  <div>
    <h1>Find your album</h1>
    <input type="text" v-model="albumSearchQuery">

    <div v-for="album in albumSearchResults" @click="selectAlbum(album.id)">
      <span>{{ album.name }}</span>
      <img :src="album.images[2].url">
    </div>
  </div>
</template>

<script>
import {getAlbum, searchSpotify} from "../assets/js/spotify-util";
import {buildPoster} from "../assets/js/build-poster";

export default {
  name: "CreatePoster",
  data() {
    return {
      albumSearchQuery: "",
      albumSearchResults: []
    }
  },
  watch: {
    // Update the search results whenever the search query changes
    albumSearchQuery: function (newAlbumSearchQuery) {
      if (newAlbumSearchQuery === "") {
        this.albumSearchResults = [];
        return;
      }

      const vueObject = this;
      searchSpotify(newAlbumSearchQuery).then(function (json) {
        vueObject.albumSearchResults = json?.albums?.items ?? []
      })
    }
  },
  methods: {
    selectAlbum(albumId) {
      getAlbum(albumId).then((json) => {
        buildPoster(json)
      })
    }
  }
};
</script>

<style scoped>

</style>