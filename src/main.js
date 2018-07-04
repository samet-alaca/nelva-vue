import Vue from 'vue';
import Vuetify from 'vuetify';

import App from '@/App';
import router from '@/router';
import store from '@/store'
import { DISCORD_INIT } from '@/store/actions';

Vue.config.productionTip = false;
Vue.use(Vuetify);

store.dispatch(DISCORD_INIT);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
