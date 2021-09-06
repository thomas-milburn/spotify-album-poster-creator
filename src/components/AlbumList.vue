<template>
  <div class="container">
    <img
        v-for="album in albums"
        :src="album.images[1].url"
        :alt="album.name"
        class="album-cover"
        @click="selectAlbum(album.id)"
    />
  </div>
</template>

<script>
import {getAlbum} from "../assets/js/spotify-util";
import {buildPoster} from "../assets/js/build-poster";

export default {
  name: "AlbumList",
  props: [
      "albums"
  ],
  methods: {
    selectAlbum(albumId) {
      getAlbum(albumId).then((json) => {
        buildPoster(json);
      });
    }
  }
};
</script>

<style scoped>

.container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  box-sizing: border-box;
  padding: 5px;
}

.album-cover {
  width: 150px;
  margin: 5px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  /* Stops the album from becoming blurry on hover when we scale for
  some reason
  */
  -webkit-backface-visibility: hidden;
  -ms-transform: translateZ(0); /* IE 9 */
  -webkit-transform: translateZ(0); /* Chrome, Safari, Opera */
  transform: translateZ(0);
}

.album-cover:hover {
  transform: scale(1.05);
}

@media screen and (min-width: 800px) {
  .container {
    padding: 0 10%;
  }
}

</style>
