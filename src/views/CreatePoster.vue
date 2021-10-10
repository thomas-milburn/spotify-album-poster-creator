<template>
  <div>
    <input type="text" v-model="albumSearchQuery" class="search-input" placeholder="Search for your album">

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

.search-input {
  height: 40px;
  width: 100%;
  padding: 3px 20px;
  margin: 25px 0;

  font-size: 15px;

  border-radius: 20px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
  transition: box-shadow 0.3s ease;
  box-sizing: border-box;
}

.search-input:focus {
  outline-width: 0;
  box-shadow: rgba(0, 0, 0, 0.35) 0 5px 15px;
}

@media screen and (min-width: 390px) {
  .search-input {
    width: 350px;
  }
}

</style>
