import { wrapFunctional } from './utils'

export { default as ArtistCard } from '../..\\components\\ArtistCard.vue'
export { default as Logo } from '../..\\components\\Logo.vue'
export { default as Menu } from '../..\\components\\Menu.vue'
export { default as NewsCard } from '../..\\components\\NewsCard.vue'
export { default as ReleaseCard } from '../..\\components\\ReleaseCard.vue'

export const LazyArtistCard = import('../..\\components\\ArtistCard.vue' /* webpackChunkName: "components/artist-card" */).then(c => wrapFunctional(c.default || c))
export const LazyLogo = import('../..\\components\\Logo.vue' /* webpackChunkName: "components/logo" */).then(c => wrapFunctional(c.default || c))
export const LazyMenu = import('../..\\components\\Menu.vue' /* webpackChunkName: "components/menu" */).then(c => wrapFunctional(c.default || c))
export const LazyNewsCard = import('../..\\components\\NewsCard.vue' /* webpackChunkName: "components/news-card" */).then(c => wrapFunctional(c.default || c))
export const LazyReleaseCard = import('../..\\components\\ReleaseCard.vue' /* webpackChunkName: "components/release-card" */).then(c => wrapFunctional(c.default || c))
