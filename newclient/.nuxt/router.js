import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _a94a2c2c = () => interopDefault(import('..\\pages\\admin\\index.vue' /* webpackChunkName: "pages/admin/index" */))
const _5c8d9d74 = () => interopDefault(import('..\\pages\\artist\\index.vue' /* webpackChunkName: "pages/artist/index" */))
const _83e267f6 = () => interopDefault(import('..\\pages\\calendar.vue' /* webpackChunkName: "pages/calendar" */))
const _3726caf4 = () => interopDefault(import('..\\pages\\moderator\\index.vue' /* webpackChunkName: "pages/moderator/index" */))
const _99c3d0e0 = () => interopDefault(import('..\\pages\\profile\\index.vue' /* webpackChunkName: "pages/profile/index" */))
const _cbbb1da2 = () => interopDefault(import('..\\pages\\search.vue' /* webpackChunkName: "pages/search" */))
const _18b7bd1e = () => interopDefault(import('..\\pages\\add\\artist.vue' /* webpackChunkName: "pages/add/artist" */))
const _03ae564d = () => interopDefault(import('..\\pages\\add\\release.vue' /* webpackChunkName: "pages/add/release" */))
const _d0971cc0 = () => interopDefault(import('..\\pages\\admin\\oldrequest.vue' /* webpackChunkName: "pages/admin/oldrequest" */))
const _0fe80963 = () => interopDefault(import('..\\pages\\admin\\user.vue' /* webpackChunkName: "pages/admin/user" */))
const _ad5401d6 = () => interopDefault(import('..\\pages\\moderator\\artist.vue' /* webpackChunkName: "pages/moderator/artist" */))
const _7e89aec7 = () => interopDefault(import('..\\pages\\moderator\\music.vue' /* webpackChunkName: "pages/moderator/music" */))
const _04382d29 = () => interopDefault(import('..\\pages\\moderator\\release.vue' /* webpackChunkName: "pages/moderator/release" */))
const _3c0d73b1 = () => interopDefault(import('..\\pages\\moderator\\request.vue' /* webpackChunkName: "pages/moderator/request" */))
const _23a6a8a4 = () => interopDefault(import('..\\pages\\user\\setting.vue' /* webpackChunkName: "pages/user/setting" */))
const _bb15805c = () => interopDefault(import('..\\pages\\edit\\artist\\_id.vue' /* webpackChunkName: "pages/edit/artist/_id" */))
const _f09615b8 = () => interopDefault(import('..\\pages\\edit\\release\\_id.vue' /* webpackChunkName: "pages/edit/release/_id" */))
const _7e0c6cdc = () => interopDefault(import('..\\pages\\artist\\_id.vue' /* webpackChunkName: "pages/artist/_id" */))
const _a9268410 = () => interopDefault(import('..\\pages\\profile\\_id.vue' /* webpackChunkName: "pages/profile/_id" */))
const _1f03695a = () => interopDefault(import('..\\pages\\release\\_id.vue' /* webpackChunkName: "pages/release/_id" */))
const _b6d048ca = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin",
    component: _a94a2c2c,
    name: "admin"
  }, {
    path: "/artist",
    component: _5c8d9d74,
    name: "artist"
  }, {
    path: "/calendar",
    component: _83e267f6,
    name: "calendar"
  }, {
    path: "/moderator",
    component: _3726caf4,
    name: "moderator"
  }, {
    path: "/profile",
    component: _99c3d0e0,
    name: "profile"
  }, {
    path: "/search",
    component: _cbbb1da2,
    name: "search"
  }, {
    path: "/add/artist",
    component: _18b7bd1e,
    name: "add-artist"
  }, {
    path: "/add/release",
    component: _03ae564d,
    name: "add-release"
  }, {
    path: "/admin/oldrequest",
    component: _d0971cc0,
    name: "admin-oldrequest"
  }, {
    path: "/admin/user",
    component: _0fe80963,
    name: "admin-user"
  }, {
    path: "/moderator/artist",
    component: _ad5401d6,
    name: "moderator-artist"
  }, {
    path: "/moderator/music",
    component: _7e89aec7,
    name: "moderator-music"
  }, {
    path: "/moderator/release",
    component: _04382d29,
    name: "moderator-release"
  }, {
    path: "/moderator/request",
    component: _3c0d73b1,
    name: "moderator-request"
  }, {
    path: "/user/setting",
    component: _23a6a8a4,
    name: "user-setting"
  }, {
    path: "/edit/artist/:id?",
    component: _bb15805c,
    name: "edit-artist-id"
  }, {
    path: "/edit/release/:id?",
    component: _f09615b8,
    name: "edit-release-id"
  }, {
    path: "/artist/:id",
    component: _7e0c6cdc,
    name: "artist-id"
  }, {
    path: "/profile/:id",
    component: _a9268410,
    name: "profile-id"
  }, {
    path: "/release/:id?",
    component: _1f03695a,
    name: "release-id"
  }, {
    path: "/",
    component: _b6d048ca,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
