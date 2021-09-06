<template>
  <div>
    <h1>Find your album</h1>
    <input type="text" v-model="albumSearchQuery">

    <album-list :albums="displayedAlbums"/>
  </div>
</template>

<script>
import {searchSpotify, getRecentlyPlayed} from "../assets/js/spotify-util";
import AlbumList from "../components/AlbumList";

export default {
  name: "CreatePoster",
  components: {AlbumList},
  data() {
    return {
      albumSearchQuery: "",
      albumSearchResults: [],
      recentlyPlayedAlbums: []
    };
  },
  mounted() {
    const vueObject = this;
    getRecentlyPlayed().then((json) => {
      const songs = json.items;
      const seenAlbumIds = [];

      for (const song of songs) {
        const album = song.track.album;
        if (seenAlbumIds.includes(album.id)) {
          continue;
        }

        seenAlbumIds.push(album.id);
        vueObject.recentlyPlayedAlbums.push(album);
      }
    });
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
        vueObject.albumSearchResults = json?.albums?.items ?? [];
      });
    }
  },
  computed: {
    displayedAlbums: function () {
      if (this.albumSearchResults.length === 0) {
        return this.recentlyPlayedAlbums;
      } else {
        return this.albumSearchResults;
      }
    }
  }
};
</script>

<style scoped>

</style>
