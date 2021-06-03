import Vue from 'vue';
import Multiselect from 'vue-multiselect'
import VueModal from '@kouts/vue-modal'
import '@kouts/vue-modal/dist/vue-modal.css'
import VueLazyload from 'vue-lazyload'

Vue.component('multiselect', Multiselect)
Vue.component('Modal', VueModal)
Vue.use(VueLazyload)

const loadimage = require('~/assets/image/loading.gif')

Vue.use(VueLazyload, {
    preLoad: 1.3,
    loading: loadimage,
    attempt: 1
  })
