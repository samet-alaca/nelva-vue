import Vue from 'vue';
import Vuetify from 'vuetify';

import App from '@/App';
import router from '@/router';

Vue.config.productionTip = false;
Vue.use(Vuetify);

/*
router.beforeEach((to, from, next) => {
    return Promise.all([store.dispatch(CHECK_AUTH)]).then(next);
});
*/

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
