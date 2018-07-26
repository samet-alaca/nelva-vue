<template lang="html">
    <v-container align-center grid-list-xl>
        <v-layout row wrap>
            <v-layout row wrap v-if="!error.state">
                <v-flex xs12>
                    <router-link :to="{ name: 'nexus' }">
                        <img src="@/assets/img/design/titles/nexus.png"/>
                    </router-link>
                </v-flex>
                <v-flex xs12 v-if="this.doc">
                    <h1 class="document-title">{{ this.doc.title }}</h1>
                    <v-card class="document-description patterned" v-if="this.doc.description.length > 0">
                        <v-card-text>{{ this.doc.description }}</v-card-text>
                    </v-card>
                    <hr class="document-hr">
                    <div class="document-container">
                        <div class="document-header" v-if="this.author">
                            <v-avatar class="document-author" :tile="false" size="100" color="grey lighten-4">
                                <img :src="avatar(this.author.user)" alt="avatar">
                            </v-avatar>
                            <div class="document-details">
                                <h2>{{ this.doc.title }}</h2>
                                <h3>par <router-link :to="{ name: 'user', params: { id: this.author.user.id } }">{{ this.author.user.username }}</router-link> - <v-icon>schedule</v-icon> {{ this.created }}</h3>
                            </div>
                        </div>
                        <hr class="classic-hr">
                        <div class="document-content" v-html="this.doc.content"></div>
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
import api from '@/api';

export default {
    name: 'Document',
    data() {
        return {
            doc: null,
            author: null,
            created: '',
            error: {
                state: false,
                message: ''
            },
        }
    },
    mounted() {
        api.getDocument(this.$store.state.token, this.$route.params.slug).then(response => {
            this.doc = response.data;
            this.created = this.format(new Date(this.doc.created));

            api.getDiscordUser(this.$store.state.token, this.doc.author).then(response => {
                this.author = JSON.parse(response.data);
            });
        }).catch(error => {
            this.error.state = true;
            this.error.message = error.message;
        });
    },
    methods: {
        avatar(user) {
            return user.avatar ? 'https://cdn.discordapp.com/avatars/' + user.id + '/' + user.avatar : this.defaultAvatars[Math.floor(Math.random() * 3)];
        },

        format(d) {
            const mm = d.getMonth() + 1;
            const dd = d.getDate();
            const date = [
                (dd > 9 ? '' : '0') + dd,
                (mm > 9 ? '' : '0') + mm,
                d.getFullYear()
            ].join('/');

            const hours = d.getHours();
            const minutes = d.getMinutes();
            const time = [
                (hours > 9 ? '' : '0') + hours,
                (minutes > 9 ? '' : '0') + minutes
            ].join('h');
            return date + ' à ' + time;
        }
    }
}
</script>

<style lang="css">
.document-title {
    font-family: 'BuiltTitling';
    font-size: 60px;
    color: #DEDEDE;
}

.document-description {
    width: 65%;
    margin: 0 auto;
}

.document-hr {
    width: 70%;
    margin: 0 auto;
}

.document-container {
    background-color: #E1E1E1;
    border: 2px solid #333;
    border-radius: 5px;
    box-shadow: 4px 4px 6px rgba(0, 0, 0, .25);
    padding: 20px;
}

.document-header {
    text-align: left;
    margin-bottom: 10px;
}

.document-details {
    display: inline-block;
    vertical-align: middle;
    margin-left: 20px;
}

.document-content {
    text-align: left;
    font-size: 16px;
}

.classic-hr {
    background-image: none;
    height: auto;
    border-bottom: 1px solid #AAA;
    margin: 10px auto;
    filter: none;
}

</style>
