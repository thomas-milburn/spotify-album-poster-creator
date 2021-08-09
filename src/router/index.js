import {createRouter, createWebHistory} from 'vue-router';
import Link from "../views/Link";
import CreatePoster from "../views/CreatePoster";
import OauthCallback from "../views/OauthCallback";

const routes = [
  {
    path: '/',
    name: 'CreatePoster',
    component: CreatePoster
  },
  {
    path: '/link',
    name: 'Link',
    component: Link
  },
  {
    path: '/oauth-callback',
    name: 'OauthCallback',
    component: OauthCallback
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
