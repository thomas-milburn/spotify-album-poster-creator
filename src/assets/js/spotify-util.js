import {getCookie, setCookie} from "./util";

export function getSpotifyAccessToken() {
   return getCookie("spotify-access-token");
}

export function getOauthUrl() {
   const redirectUrl = new URL(window.location.href);
   redirectUrl.pathname = "/oauth-callback";

   // Generating a random cookie for state that can be verified
   const stateValue = Math.random() * 100000000 + "";
   setCookie("state", stateValue);

   // Building oauth url
   const oauthUrl = new URL("https://accounts.spotify.com/authorize");
   oauthUrl.searchParams.append("client_id", process.env.VUE_APP_SPOTIFY_CLIENT_ID);
   oauthUrl.searchParams.append("state", stateValue);
   oauthUrl.searchParams.append("scope", "user-read-recently-played")
   oauthUrl.searchParams.append("response_type", "token");
   oauthUrl.searchParams.append("redirect_uri", redirectUrl.toString());

   return oauthUrl.toString();
}

export function searchSpotify(query) {
   const url = new URL("https://api.spotify.com/v1/search");
   url.searchParams.set("q", query)
   url.searchParams.set("type", "album")
   return spotifyGet(url)
}

export function getAlbum(albumId) {
   const url = new URL(`https://api.spotify.com/v1/albums/${albumId}`);
   return spotifyGet(url)
}

export function getRecentlyPlayed() {
   const url = new URL("https://api.spotify.com/v1/me/player/recently-played");
   url.searchParams.set("limit", "50")
   return spotifyGet(url)
}

function spotifyGet(url) {
   return fetch(url.toString(), {
      headers: {
         "Authorization": `Bearer ${getSpotifyAccessToken()}`
      }
   }).then((res) => res.json());
}
