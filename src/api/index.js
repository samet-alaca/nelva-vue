import axios from 'axios';
import qs from 'qs';
import config from '@/../config.json';

const url = 'http://localhost:7000';

export default {
    authenticate() {
        return axios.post(url + '/authenticate', { username: config.api.username, password: config.api.password });
    },

    getDiscordToken(code) {
        return axios({
            method: 'POST',
            data: qs.stringify({
                client_id: config.discord.CLIENT_ID,
                client_secret: config.discord.CLIENT_SECRET,
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: config.discord.REDIRECT
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            url: 'https://discordapp.com/api/oauth2/token'
        });
    },

    refreshDiscordToken(token) {
        return axios({
            method: 'POST',
            data: qs.stringify({
                client_id: config.discord.CLIENT_ID,
                client_secret: config.discord.CLIENT_SECRET,
                grant_type: 'refresh_token',
                refresh_token: token,
                redirect_uri: config.discord.REDIRECT
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            url: 'https://discordapp.com/api/oauth2/token'
        });
    },

    getDiscordGuilds(token) {
        return axios({
            method: 'GET',
            data: '',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + token
            },
            url: 'https://discordapp.com/api/users/@me/guilds'
        });
    },

    getDiscordAuthUser(token) {
        return axios({
            method: 'GET',
            data: '',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + token
            },
            url: 'https://discordapp.com/api/users/@me'
        });
    },

    bindDiscordChannel(token, channel, port) {
        return axios.post(url + '/discord/' + channel + '/bind', { token: token, port: port });
    },

    getDiscordMessages(token, channel) {
        return axios.post(url + '/discord/' + channel + '/messages', { token: token });
    },

    sendMessage(message, username, avatar) {
        return axios({
            method: 'POST',
            data: qs.stringify({
                content: message,
                username: username,
                avatar_url: avatar
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            url: config.discord.webhook
        });
    },

    getDiscordUsers(token) {
        return axios.post(url + '/discord/users', { token: token });
    },

    getDiscordUser(token, id) {
        return axios.post(url + '/discord/user/' + id, { token: token });
    },

    getDiscordRole(token, id) {
        return axios.post(url + '/discord/role/' + id, { token: token });
    },

    getUserStats(token, id, period, group, slip) {
        return axios.post(url + '/stats', { token: token, users: [ id ], period: period, group: group, slip: slip });
    },

    getUserRanks(token, id) {
        return axios.post(url + '/ranks/' + id, { token: token });
    },

    getNexus(token) {
        return axios.post(url + '/nexus', { token: token });
    },

    getDocument(token, slug) {
        return axios.post(url + '/nexus/' + slug, { token: token });
    },

    insertDocument(token, doc) {
        return axios.put(url + '/nexus/' + doc.slug, Object.assign({ token: token }, doc));
    },

    removeDocument(token, slug) {
        return axios.delete(url + '/nexus/' + slug, { token: token });
    },

    getCategories(token) {
        return axios.post(url + '/categories', { token: token });
    },

    createCategory(token, id, category) {
        return axios.put(url + '/categories/' + id, { token: token, title: category })
    },

    removeCategory(token, id) {
        return axios({
            method: 'DELETE',
            data: { token: token },
            url: url + '/categories/' + id
        });
    }
};
