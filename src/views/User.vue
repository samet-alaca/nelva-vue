<template lang="html">
    <v-container align-center grid-list-xl>
        <v-layout row wrap>
            <v-flex xs12>
                <router-link :to="{ name: 'users' }"><img src="@/assets/img/design/titles/users.png"/></router-link>
            </v-flex>
            <v-layout row wrap v-if="!error.state">
                <v-flex md6>
                    <div class="block" v-if="this.user">
                        <h1>{{ this.user.user.username }}#{{ this.user.user.discriminator }}</h1>
                        <v-avatar :tile="false" size="100" color="grey lighten-4">
                            <img :src="this.avatar(this.user.user)" alt="avatar">
                        </v-avatar>
                        <div class="roles">
                            <div class="role" :data-border="role.color" v-for="role in this.roles" :key="role.user"><div class="circle" :data-color="role.color"></div>{{ role.name }}</div>
                        </div>
                        <hr>
                        <div class="ranks" v-if="this.ranks">
                            <v-tooltip top>
                                <div class="rank" slot="activator">
                                    <img class="rank-img" src="@/assets/img/design/military.png">
                                    <h2 class="rank-value">{{ this.ranks.military }}</h2>
                                </div>
                                <span>Militaire</span>
                            </v-tooltip>
                            <v-tooltip top>
                                <div class="rank" slot="activator">
                                    <img class="rank-img" src="@/assets/img/design/economy.png">
                                    <h2 class="rank-value">{{ this.ranks.economy }}</h2>
                                </div>
                                <span>Economie</span>
                            </v-tooltip>
                            <v-tooltip top>
                                <div class="rank" slot="activator">
                                    <img class="rank-img" src="@/assets/img/design/diplomacy.png">
                                    <h2 class="rank-value">{{ this.ranks.diplomacy }}</h2>
                                </div>
                                <span>Diplomatie</span>
                            </v-tooltip>
                            <v-tooltip top>
                                <div class="rank" slot="activator">
                                    <img class="rank-img" src="@/assets/img/design/leadership.png">
                                    <h2 class="rank-value">{{ this.ranks.leadership }}</h2>
                                </div>
                                <span>Leadership</span>
                            </v-tooltip>
                            <v-tooltip top>
                                <div class="rank rank-last" slot="activator">
                                    <img class="rank-img" src="@/assets/img/design/involvement.png">
                                    <h2 class="rank-value">{{ this.ranks.involvement }}</h2>
                                </div>
                                <span>Implication</span>
                            </v-tooltip>
                            <br>
                            <img class="ribbon" :src="this.ribbon">
                        </div>
                    </div>
                </v-flex>
                <v-flex md6>
                    <div class="block" v-if="this.user">
                        <v-layout row wrap>
                            <v-flex xs6>
                                <v-select @change="changePeriod" v-model="selected" :items="periods" item-text="text" item-value="value" box label="Période"></v-select>
                            </v-flex>
                            <v-flex xs6>
                                <v-select @change="changeSlip" v-model="defaultSlip" :items="slips" item-text="text" item-value="value" box label="Période glissante"></v-select>
                            </v-flex>
                        </v-layout>
                        <div ref="chartContainer">
                            <canvas ref="chart"></canvas>
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
import Chart from 'chart.js';
import config from '@/../config';
import api from '@/api';

export default {
    name: 'Member',
    data() {
        return {
            user: null,
            stats: null,
            ranks: null,
            ribbon: '',
            slip: true,
            slips: [
                { value: true, text: 'Glissant' },
                { value: false, text: 'Non glissant' }
            ],
            defaultSlip: { value: true, text: 'Glissant' },
            roles: [],
            period: '-week',
            chart: null,
            selected: { value: '-week', text: 'Cette semaine' },
            periods: [
                { value: '-week', text: 'Cette semaine' },
                { value: '-month', text: 'Ce mois' },
                { value: '-year', text: 'Cette année' }
            ],
            defaultAvatars: config.discord.avatars,
            error: {
                state: false,
                message: ''
            },
        }
    },
    methods: {
        changeSlip(slip) {
            this.slip = slip;
            this.changePeriod(this.period);
        },

        changePeriod(period) {
            this.period = period;
            api.getUserStats(this.$store.state.token, this.$route.params.id, this.period, false, this.slip).then(response => {
                this.stats = response.data;
                this.stats.sort((a, b) => {
                    const dateA = new Date(a.date.substr(6) + '-' + a.date.substr(3, 2) + '-' + a.date.substr(0, 2));
                    const dateB = new Date(b.date.substr(6) + '-' + b.date.substr(3, 2) + '-' + b.date.substr(0, 2));
                    return dateA - dateB;
                });
                this.createChart();
            }).catch(error => {
                this.error.state = true;
                this.error.message = error.message;
            });
        },

        formatColors() {
            document.querySelectorAll('[data-border]').forEach(element => {
                element.style.borderColor = this.toHex(element.getAttribute('data-border'));
            });
            document.querySelectorAll('[data-color]').forEach(element => {
                element.style.backgroundColor = this.toHex(element.getAttribute('data-color'));
            });
        },

        toHex(color) {
            const hex = parseInt(color).toString(16);
            return hex === '0' ? '#6c757d' : '#' + hex;
        },

        avatar(user) {
            return user.avatar ? 'https://cdn.discordapp.com/avatars/' + user.id + '/' + user.avatar : this.defaultAvatars[Math.floor(Math.random() * 3)];
        },

        createChart() {
            if(this.chart) {
                this.chart.destroy();
            }
            const data = {
                labels: [],
                datasets: [
                    {
                        label: 'Nombre de messages',
                        data: [],
                        backgroundColor: "rgba(58, 93, 174, 0.8)",
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75, 192, 192, 1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 2,
                        pointHoverRadius: 2,
                        pointHoverBackgroundColor: "rgba(75, 192, 192, 1)",
                        pointHoverBorderColor: "rgba(220, 220, 220, 1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                    },
                    {
                        label: 'Nombre de caractères',
                        data: [],
                        backgroundColor: "rgba(100, 59, 25, 0.8)",
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75, 192, 192, 1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 2,
                        pointHoverRadius: 2,
                        pointHoverBackgroundColor: "rgba(75, 192, 192, 1)",
                        pointHoverBorderColor: "rgba(220, 220, 220, 1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                    }
                ]
            };
            this.stats.forEach(stat => {
                data.labels.push(stat.date);
                data.datasets[0].data.push(stat.messages);
                data.datasets[1].data.push(stat.characters);
            });
            this.chart = new Chart(this.$refs.chart, {
                type: 'line',
                data: data
            });
        }
    },

    created() {
        const error = error => {
            this.error.state = true;
            this.error.message = error.message;
        };

        api.getDiscordUser(this.$store.state.token, this.$route.params.id).then(response => {
            this.user = JSON.parse(response.data);
            const promises = [];
            for(const role of this.user._roles) {
                promises.push(new Promise((resolve, reject) => {
                    api.getDiscordRole(this.$store.state.token, role).then(response => {
                        this.roles.push(JSON.parse(response.data));
                        resolve();
                    }).catch(error => {
                        this.error.state = true;
                        this.error.message = error.message;
                        reject();
                    });
                }));
            }
            Promise.all(promises).then(() => {
                this.formatColors();
            });
        }).catch(error);

        api.getUserStats(this.$store.state.token, this.$route.params.id, this.period, false, this.slip).then(response => {
            this.stats = response.data;
            this.stats.sort((a, b) => {
                const dateA = new Date(a.date.substr(6) + '-' + a.date.substr(3, 2) + '-' + a.date.substr(0, 2));
                const dateB = new Date(b.date.substr(6) + '-' + b.date.substr(3, 2) + '-' + b.date.substr(0, 2));
                return dateA - dateB;
            });
            this.createChart();
        }).catch(error);

        api.getUserRanks(this.$store.state.token, this.$route.params.id).then(response => {
            if(response.data.length > 0) {
                this.ranks = response.data[0];
                const sum = this.ranks.military + this.ranks.diplomacy + this.ranks.economy + this.ranks.leadership;
                let r = 5;
                if(sum < 18) { r = 4; }
                if(sum < 15) { r = 3; }
                if(sum < 10) { r = 2; }
                if(sum < 6) { r = 1; }
                this.ribbon = require('@/assets/img/ribbons/' + (this.ranks.selected + 1) + '/' + r + '-' + this.ranks.involvement + '.jpg');
            }
        }).catch(error);
    },
}
</script>

<style lang="css">
.block {
    background-color: white;
    width: 100%;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, .3);
    border: 2px solid #444;
    padding: 15px;
}

.roles {
    margin-top: 10px;
    width: 75%;
    margin-left: auto;
    margin-right: auto;
}

.role {
    border: 1px solid red;
    display: inline-block;
    margin: 3px;
    padding: 2px 4px;
    vertical-align: middle;
    border-radius: 15px;
}

.circle {
    width: 14px;
    height: 14px;
    margin-right: 4px;
    border-radius: 100%;
    background-color: red;
    display: inline-block;
    position: relative;
    top: 2px;
}

.rank {
    display: inline-block;
    margin-right: 25px;
    border: 1px solid #3498DB;
    padding: 5px 10px;
    margin-bottom: 10px;
    border-radius: 4px;
    transition: 250ms;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, .3);
}

.rank-last {
    margin-right: 0px;
}

.rank-value {
    color: #3498DB;
    transition: 250ms;
}

.rank-img {
    margin-top: 5px;
    width: 64px;
    height: 64px;
}

.rank:hover {
    background-color: #3498DB;
}

.rank:hover > .rank-value {
    color: white;
}

.ribbon {
    margin-top: 10px;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, .3);
}
</style>
