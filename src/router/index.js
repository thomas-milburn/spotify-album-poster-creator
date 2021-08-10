import {createRouter, createWebHistory} from 'vue-router';
import Link from "../views/Link";
import CreatePoster from "../views/CreatePoster";
import OauthCallback from "../views/OauthCallback";
import {getSpotifyAccessToken} from "../assets/js/util";

const routes = [
   {
      path: '/',
      name: 'createPoster',
      component: CreatePoster
   },
   {
      path: '/link',
      name: 'link',
      component: Link
   },
   {
      path: '/oauth-callback',
      name: 'oauthCallback',
      component: OauthCallback
   }
];

const router = createRouter({
   history: createWebHistory(),
   routes
});

// Controlling which routes users can access if they don't have an access token
router.beforeResolve((to, from, next) => {
   // Checking if we have an access token stored in a cookie
   const cookieAccessToken = getSpotifyAccessToken();

   if (cookieAccessToken === null) {
      // The access token has not yet been set, checking if we are on a whitelisted page
      const allowedNoAccessToken = ["oauthCallback", "link"];
      if (allowedNoAccessToken.includes(to.name)) {
         next();
      } else {
         // Trying to access page requiring access token with access token, redirect them
         next({name: "link"});
      }

      return;
   }

   next();
});

export default router;
