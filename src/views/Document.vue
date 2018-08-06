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
                                <h4 v-html="getCategory(doc.category)"></h4>
                                <h3>par <router-link :to="{ name: 'user', params: { id: this.author.user.id } }">{{ this.author.user.username }}</router-link> - <v-icon>schedule</v-icon> {{ this.created }}</h3>
                            </div>
                            <div class="document-actions">

                                <!--
                                    <v-btn color="info" icon><v-icon>edit</v-icon></v-btn>
                                -->
                                <v-dialog v-model="dialog" persistent max-width="400">
                                    <v-btn slot="activator" color="error" icon><v-icon>delete</v-icon></v-btn>
                                    <v-card>
                                        <v-card-title class="headline">Êtes-vous sûr de vouloir supprimer ce document ?</v-card-title>
                                        <v-card-text>Cette action est irréversible, le document sera perdu à tout jamais dans les ténèbres...</v-card-text>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="red darken-1" flat @click.native="dialog = false">Oups, annulez ça</v-btn>
                                            <v-btn color="blue darken-1" flat @click="deleteDocument">BRÛLE HERETIQUE</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
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
            dialog: false,
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
        api.getCategories(this.$store.state.token).then(response => {
            this.categories = response.data;
        });
    },
    methods: {
        avatar(user) {
            return user.avatar ? 'https://cdn.discordapp.com/avatars/' + user.id + '/' + user.avatar : this.defaultAvatars[Math.floor(Math.random() * 3)];
        },

        getCategory(id) {
            return this.categories.filter(el => el.id == id)[0].title;
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
        },

        deleteDocument() {
            this.dialog = false;
            api.removeDocument(this.$store.state.token, this.$route.params.slug).then(() => {
                api.removeCourse(this.$store.state.token, this.$route.params.slug);
                window.location.href = window.location.origin + '/nexus';
            });
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
.document-details > h2 { margin-right: 10px; }
.document-details > h4 {
    background-color: #3498DB;
    color: white;
    padding: 5px;
    border-radius: 15px;
}
.document-details > h4, .document-details > h2 {
    display: inline-block;
}

.document-actions {
    float: right;
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
