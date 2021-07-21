import Vue from 'vue'
import { wrapFunctional } from './utils'

const components = {
  ArtistCard: () => import('../..\\components\\ArtistCard.vue' /* webpackChunkName: "components/artist-card" */).then(c => wrapFunctional(c.default || c)),
  Logo: () => import('../..\\components\\Logo.vue' /* webpackChunkName: "components/logo" */).then(c => wrapFunctional(c.default || c)),
  Menu: () => import('../..\\components\\Menu.vue' /* webpackChunkName: "components/menu" */).then(c => wrapFunctional(c.default || c)),
  NewsCard: () => import('../..\\components\\NewsCard.vue' /* webpackChunkName: "components/news-card" */).then(c => wrapFunctional(c.default || c)),
  ReleaseCard: () => import('../..\\components\\ReleaseCard.vue' /* webpackChunkName: "components/release-card" */).then(c => wrapFunctional(c.default || c))
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
