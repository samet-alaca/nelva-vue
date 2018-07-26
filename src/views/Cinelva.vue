<template lang="html">
    <div class="cinelva-container">
        <Player class="player"></Player>
        <div class="tchat" v-if="!this.error.state">
            <div class="messages" ref="messages">
                <div class="message" v-for="message in this.messages" :key="message.id">
                    <div class="message-header">
                        <v-avatar class="message-avatar" :tile="false" size="42" color="grey lighten-4">
                            <img :src="avatar(message.author)" alt="avatar">
                        </v-avatar>
                        <div class="message-details">
                            <h4 class="message-author">{{ message.author.username }}</h4>
                            <span class="message-date">{{ message.created }}</span>
                            <br>
                            <span class="message-bot" v-if="message.author.bot">BOT</span>
                        </div>
                    </div>
                    <div class="message-content">
                        {{ message.content }}
                    </div>
                    <div class="sep"></div>
                </div>
            </div>
            <input class="input" type="text" placeholder="Envoyer un message" ref="input">
        </div>
        <div class="tchat-error" v-else>
            <div class="error-message">
                {{ this.error.message }}
                <br><br>
                <a class="discord-login" href="https://discordapp.com/api/oauth2/authorize?client_id=464085305453182986&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Flogin&response_type=code&scope=identify%20guilds">Connexion</a>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/api';
import config from '@/../config';
import Player from '@/components/Player';
import io from 'socket.io-client';

export default {
    name: 'Cinelva',
    components: {
        Player
    },
    data() {
        return {
            messages: [],
            defaultAvatars: config.discord.avatars,
            error: {
                state: false,
                message: ''
            }
        }
    },
    mounted() {
        if(!this.$session.get('discordToken')) {
            this.error.state = true;
            this.error.message = 'Vous devez vous connecter';
        } else {
            this.user = this.$session.get('discordUser');
            api.bindDiscordChannel(this.$store.state.token,  config.discord.channels.bar, config.discord.port).then(() => {
                const socket = io('http://localhost:' + config.discord.port);
                socket.on('connect', () => {
                    socket.on('message', message => {
                        this.messages.push(message);
                        window.setTimeout(() => {
                            if(this.$refs.messages) {
                                this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight;
                            }
                        }, 250);
                    });
                });
                socket.on('connect_error', () => {
                    this.error.state = true;
                    this.error.message = 'Connexion en temps réel au serveur impossible... API down ?';
                });
            });

            api.getDiscordMessages(this.$store.state.token, config.discord.channels.bar).then(response => {
                this.messages = JSON.parse(response.data).reverse();
                window.setTimeout(() => {
                    this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight;
                }, 250);
            });

            this.$refs.input.addEventListener('keypress', event => {
                if(event.charCode === 13) {
                    api.sendMessage(this.$refs.input.value, this.user.username, 'https://cdn.discordapp.com/avatars/' + this.user.id + '/' + this.user.avatar);
                    this.$refs.input.value = '';
                }
            });
        }
    },
    methods: {
        avatar(user) {
            if(user.avatar.startsWith('https')) {
                return user.avatar;
            }
            return user.avatar ? 'https://cdn.discordapp.com/avatars/' + user.id + '/' + user.avatar : this.defaultAvatars[Math.floor(Math.random() * 3)];
        },
    }
}
</script>

<style lang="css">
.cinelva-container {
    display: flex;
}

.player {
    width: calc(82% + 9px);
    display: inline-block;
}

.tchat {
    float: right;
    width: calc(18% - 10px);
    height: calc(100vh - 64px);
    background-color: rgba(54, 57, 63);
    color: white;
    padding: 10px;
}

.messages {
    height: calc(100% - 45px);
    overflow-y: scroll;
    overflow-x: hidden;
}

.messages::-webkit-scrollbar {
    width: 10px;
}

/* Track */
.messages::-webkit-scrollbar-track {
    background: #666;
}

/* Handle */
.messages::-webkit-scrollbar-thumb {
    background: #222;
}

/* Handle on hover */
.messages::-webkit-scrollbar-thumb:hover {
    background: #111;
}

.message-header {
    display: flex;
    padding: 5px;
}

.message-details {
    margin-left: 15px;
}

.message-author, .message-date {
    display: inline-block;
}

.message-date {
    margin-left: 7px;
    font-size: 12px;
    color: #777;
    vertical-align: bottom;
}

.message-content {
    margin-top: 5px;
    overflow-x: hidden;
    word-break: break-all;
}

.sep {
    margin-top: 5px;
    height: 1px;
    width: 100%;
    background-color: #777;
}

.input {
    margin-top: 5px;
    height: 40px;
    width: 100%;
    padding: 10px;
    background-color: rgba(72, 75, 81);
    outline: none;
    border-radius: 7px;
    color: #FFF;
}

.tchat-error {
    float: right;
    width: calc(18% - 10px);
    height: calc(100vh - 64px);
    background-color: rgba(54, 57, 63);
    color: white;
    padding: 10px;
    display: table;
}

.error-message {
    height: 100%;
    text-align: center;
    display: table-cell;
    vertical-align: middle;
}

.discord-login {
    background-color: #7289DA;
    padding: 15px;
    color: white;
    text-decoration: none;
    border-radius: 6px;
    text-transform: uppercase;
}

.message-bot {
    background-color: #7289DA;
    color: white;
    padding: 2px;
    border-radius: 4px;
    font-size: 11px;
}
</style>
