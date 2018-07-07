<template lang="html">
    <v-container align-center grid-list-xl>
        <v-layout row wrap>
            <v-flex xs12>
                <img src="@/assets/img/design/titles/users.png"/>
            </v-flex>
            <v-layout row wrap v-if="!error.state">
                <v-flex md4>
                    <div class="user-container">
                        <div class="user" v-for="member in users.admins" :key="member.user.id">
                            <router-link :to="{ name: 'user', params: { id: member.user.id } }">
                                <v-tooltip top>
                                    <div class="user-avatar" slot="activator">
                                        <img :src="avatar(member.user)"/>
                                    </div>
                                    <span class="tooltip" v-html="member.nickname || member.user.username"></span>
                                </v-tooltip>
                            </router-link>
                        </div>
                    </div>
                </v-flex>

                <v-flex md4>
                    <div class="user-container">
                        <div class="user" v-for="member in users.members" :key="member.user.id">
                            <router-link :to="{ name: 'user', params: { id: member.user.id } }">
                                <v-tooltip top>
                                    <div class="user-avatar" slot="activator">
                                        <img :src="avatar(member.user)"/>
                                    </div>
                                    <span class="tooltip" v-html="member.nickname || member.user.username"></span>
                                </v-tooltip>
                            </router-link>
                        </div>
                    </div>
                </v-flex>

                <v-flex md4>
                    <div class="user-container">
                        <div class="user" v-for="member in users.visitors" :key="member.user.id">
                            <router-link :to="{ name: 'user', params: { id: member.user.id } }">
                                <v-tooltip top>
                                    <div class="user-avatar" slot="activator">
                                        <img :src="avatar(member.user)"/>
                                    </div>
                                    <span class="tooltip" v-html="member.nickname || member.user.username"></span>
                                </v-tooltip>
                            </router-link>
                        </div>
                    </div>
                </v-flex>
            </v-layout>
            <v-layout row wrap v-else>
                <v-flex xs12>
                    <v-alert :value="true" type="error">{{ error.message }}</v-alert>
                </v-flex>
            </v-layout>
        </v-layout>
    </v-container>
</template>

<script>
import config from '@/../config';
import api from '@/api';

export default {
    name: 'Members',
    data() {
        return {
            users: {
                admins: [],
                members: [],
                visitors: []
            },
            error: {
                state: false,
                message: ''
            },
            defaultAvatars: config.discord.avatars
        }
    },
    created() {
        api.getDiscordUsers(this.$store.state.token).then(response => {
            this.users = response.data;
        }).catch(error => {
            this.error.state = true;
            this.error.message = error.message;
        });
    },
    methods: {
        avatar(user) {
            return user.avatar ? 'https://cdn.discordapp.com/avatars/' + user.id + '/' + user.avatar : this.defaultAvatars[Math.floor(Math.random() * 3)];
        }
    }
}
</script>

<style lang="css">
.user-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
}

.user, .user img {
    transition: 250ms;
    cursor: pointer;
}

.user:hover img {
    filter: grayscale(100%);
}

.tooltip {
    color: white;
}

.user-avatar, .user-avatar > img {
    width: 64px;
    height: 64px;
    border-radius: 100%;
}

.user-avatar {
    margin: 5px;
}

.status-wrapper {
    position: absolute;
    bottom: 5px;
    left: 55px;
    padding: 0px;
    box-shadow: 0 0 0 2px #4a69bd;
    border-radius: 100%;
}

.status {
    position: relative;
    min-height: 12px;
    padding-left: 6px;
    padding-right: 6px;
    border-radius: 100%;
}

.status-online { background-color: #43B581; }
.status-idle { background-color: #FAA61A; }
.status-dnd { background-color: #F04747; }
.status-offline { background-color: #747F8D; }
</style>
