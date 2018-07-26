import Vue from 'vue';
import Vuetify from 'vuetify';
import VueSession from 'vue-session';

import App from '@/App';
import router from '@/router';
import store from '@/store'
import { AUTHENTICATE } from '@/store/actions.type';

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(VueSession);
store.dispatch(AUTHENTICATE);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
