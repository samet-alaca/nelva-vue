import axios from 'axios';
import config from '@/../config.json';

const url = 'http://localhost:3001';

export default {
    authenticate() {
        return axios.post(url + '/authenticate', { username: config.api.username, password: config.api.password });
    },

    getDiscordUsers(token) {
        return axios.post(url + '/discord/users', { token: token });
    },

    getDiscordUser(token, id) {
        return axios.post(url + '/discord/user/' + id, { token: token });
    }
};
