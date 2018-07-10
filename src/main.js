import Vue from 'vue';
import Vuetify from 'vuetify';

import App from '@/App';
import router from '@/router';
import store from '@/store'
import { AUTHENTICATE } from '@/store/actions.type';

Vue.config.productionTip = false;
Vue.use(Vuetify);
store.dispatch(AUTHENTICATE);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
