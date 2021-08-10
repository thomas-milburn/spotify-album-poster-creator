// https://stackoverflow.com/a/25346429/5863898
export function getCookie(name) {
   function escape(s) {
      return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1');
   }

   const match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
   return match ? match[1] : null;
}

// Modified from https://stackoverflow.com/a/24103596/5863898
export function setCookie(name, value, seconds) {
   let expires = "";
   if (seconds) {
      const date = new Date();
      date.setTime(date.getTime() + (seconds * 1000));
      expires = "; expires=" + date.toUTCString();
   }
   document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export function getSpotifyAccessToken() {
   return getCookie("spotify-access-token")
}