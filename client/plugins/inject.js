import Vue from 'vue';
import Multiselect from 'vue-multiselect';
import VueModal from '@kouts/vue-modal';
import '@kouts/vue-modal/dist/vue-modal.css';
import vReadMoreBox from "v-read-more-box";
import LazyLoading from 'vue-lazy-loading';
import vuescroll from 'vuescroll';
import 'animate.css';

Vue.component('multiselect', Multiselect)
Vue.component('Modal', VueModal)
Vue.component("v-read-more-box", vReadMoreBox)
Vue.use(LazyLoading)
Vue.use(vuescroll)
