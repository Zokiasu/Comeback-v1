/*import Vue from 'vue';
import VCalendar from 'v-calendar';

// Use v-calendar & v-date-picker components
Vue.use(VCalendar, {
    componentPrefix: 'vc',  // Use <vc-calendar /> instead of <v-calendar />
});*/
import Vue from 'vue';
import Multiselect from 'vue-multiselect'
import VueModal from '@kouts/vue-modal'
import '@kouts/vue-modal/dist/vue-modal.css'

Vue.component('multiselect', Multiselect)
Vue.component('Modal', VueModal)