import Vue from 'vue';
import Vuex from 'vuex';
import { DISCORD_READY, DISCORD_INIT, DISCORD_CHECK } from '@/store/actions.js';
import Discord from 'discord.js';
import config from '@/../config';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		discord: null
	},
	actions: {
		[DISCORD_READY]({ commit }, discord) {
			commit(DISCORD_READY, discord);
		},
		[DISCORD_INIT]({ commit }) {
			return new Promise((resolve, reject) => {
				const discord = new Discord.Client();
				discord.login(config.discord.token);
				discord.on('ready', () => {
					commit(DISCORD_READY, discord);
					resolve();
				});
				discord.on('error', () => {
					reject();
				});
			});
		},
		[DISCORD_CHECK]({ state }) {
			return new Promise((resolve, reject) => {
				if(!state.discord) {
					this.dispatch(DISCORD_INIT).then(resolve).catch(reject);
				} else {
					resolve();
				}
			});
		}
	},
	mutations: {
		[DISCORD_READY](state, discord) {
			state.discord = discord;
		}
	}
});
