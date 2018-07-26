import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api';
import * as actions from '@/store/actions.type';
import * as mutations from '@/store/mutations.type';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: null,
        discordToken: null,
        refreshToken: null
    },
    actions: {
        [actions.AUTHENTICATE]({ commit }) {
            return new Promise((resolve, reject) => {
                api.authenticate().then(response => {
                    commit(mutations.SET_TOKEN, response.data.token);
                    resolve();
                }).catch(error => {
                    reject(error);
                });
            });
        },
        [actions.CHECK_AUTH]({ state }) {
            return new Promise((resolve, reject) => {
                if(!state.token) {
                    this.dispatch(actions.AUTHENTICATE).then(resolve).catch(reject);
                } else {
                    resolve();
                }
            });
        }
    },
    mutations: {
        [mutations.SET_TOKEN](state, token) {
            state.token = token;
        }
    }
});
