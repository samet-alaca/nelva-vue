<template lang="html">
    <v-container align-center grid-list-xl>
        <v-layout row wrap>
            <v-layout row wrap v-if="!error.state">
                <v-flex xs12>
                    <img src="@/assets/img/design/titles/nexus.png"/>
                    <v-flex xs12>
                        <v-card class="patterned">
                            <v-card-text>Bienvenue dans la base de données de documents du Royaume de Nelva</v-card-text>
                        </v-card>
                        <hr>
                    </v-flex>
                </v-flex>
                <v-flex xs12>
                    <input class="search-bar" placeholder="Chercher un document" type="text"/>
                    <v-layout align-center row wrap>
                        <v-flex xs2 offset-xs4>
                            <v-btn ref="document" :disabled="this.creatingDocument" color="info" @click="createDocument"><v-icon>add</v-icon> Nouveau document</v-btn>
                        </v-flex>
                        <v-flex xs2>
                            <v-btn ref="category" :disabled="this.creatingCategory" color="info" @click="createCategory"><v-icon>add</v-icon> Nouvelle catégorie</v-btn>
                        </v-flex>
                    </v-layout>
                    <div v-if="this.creatingDocument" class="document-creator">
                        doc
                    </div>
                    <div  v-else-if="this.creatingCategory" class="category-creator">
                        <div class="categories">
                            <v-chip color="primary" close text-color="white" @input="removeCategory(category.id)" v-for="category in this.categories" :key="category.id">{{ category.title }}</v-chip>
                        </div>
                        <v-flex xs4 offset-xs4>
                            <v-text-field label="Catégorie" v-model="category"></v-text-field>
                            <v-btn color="primary" @click="newCategory">Valider</v-btn>
                        </v-flex>
                    </div>
                    <div v-else class="grid">
                        <div class="document" v-for="doc in this.documents" :key="doc.slug" @click="openDocument(doc.slug)">
                            <div class="doc-img">
                                <img :src="require('@/assets/uploads/' + doc.image)" />
                            </div>
                            <div class="doc-title">
                                <h2>{{ doc.title }}</h2>
                            </div>
                            <div class="doc-desc">
                                <p>{{ doc.description }}</p>
                            </div>
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
import api from '@/api';

export default {
    name: 'Nexus',
    data() {
        return {
            documents: [],
            categories: [],
            category: '',
            error: {
                state: false,
                message: ''
            },
            creatingCategory: false,
            creatingDocument: false
        }
    },
    mounted() {
        api.getNexus(this.$store.state.token).then(response => {
            this.documents = response.data;
        }).catch(error => {
            this.error.state = true;
            this.error.message = error.message;
        });
        api.getCategories(this.$store.state.token).then(response => {
            this.categories = response.data || [];
        });
    },
    methods: {
        openDocument(slug) {
            this.$router.push({ name: 'document', params: { slug: slug }});
        },

        createDocument() {
            this.creatingDocument = true;
            this.creatingCategory = false;
        },

        createCategory() {
            this.creatingCategory = true;
            this.creatingDocument = false;
        },

        newCategory() {
            api.createCategory(this.$store.state.token, this.hash(this.category), this.category).then(() => {
                api.getCategories(this.$store.state.token).then(response => {
                    this.categories = response.data;
                    this.category = '';
                });
            });
        },

        removeCategory(id) {
            api.removeCategory(this.$store.state.token, id).then(() => {
                api.getCategories(this.$store.state.token).then(response => {
                    this.categories = response.data;
                });
            });
        },

        hash(string) {
            let a = 1, c = 0, h, o;
            if (string) {
                a = 0;
                for (h = string.length - 1; h >= 0; h--) {
                    o = string.charCodeAt(h);
                    a = (a<<6&268435455) + o + (o<<14);
                    c = a & 266338304;
                    a = c!==0?a^c>>21:a;
                }
            }
            return String(a);
        }
    }
}
</script>

<style lang="css">
.search-bar {
    width: 75%;
    margin: 0 auto;
    background-color: white;
    height: 40px;
    padding: 10px;
    outline: none;
    border: 2px solid #333;
    transition: 250ms;
}

.search-bar:focus, .search-bar:hover {
    border-color: #3498DB;
}

.grid {
    margin-top: 25px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.document {
    flex-basis: 24%;
    max-height: 300px;
    padding: 20px;
    box-sizing: border-box;
    margin-bottom: 20px;
    background-color: #F1F1F1;
    border: 2px solid #333;
    border-radius: 5px;
    box-shadow: 4px 4px 6px rgba(0, 0, 0, .25);
    transition: 250ms;
    cursor: pointer;
}

.document:hover {
    box-shadow: 7px 7px 6px rgba(0, 0, 0, .45);
    border-color: #3498DB;
}

.doc-img, .doc-img > img {
    height: 160px;
    width: auto;
}
</style>
