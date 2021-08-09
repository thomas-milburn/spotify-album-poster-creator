import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Link from "../views/Link";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/link',
    name: 'Link',
    component: Link
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
