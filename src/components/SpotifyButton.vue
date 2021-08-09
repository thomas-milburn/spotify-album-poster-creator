<template>
  <button
      class="spotify-button"
      type="button"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "SpotifyButton",
  props: {
    text: {
      default: "",
      type: String
    }
  }
};
</script>

<style scoped>

.spotify-button {
  padding: 20px 40px;
  border: none;
  border-radius: 20px;

  text-transform: uppercase;
  background-color: #1DB954;
  color: white;
  font-weight: bold;
  font-size: 15px;

  cursor: pointer;
  transition: transform 0.1s ease-in-out;
}

.spotify-button:hover {
  transform: scale(1.01);
}

</style>