<template lang="html">
    <v-container align-center grid-list-xl>
        <v-layout row wrap>
            <v-layout row wrap v-if="!error.state">
                <v-flex xs12>
                    <div class="logo-wrap">
                        <img class="nexus-img" src="@/assets/img/design/titles/nexus.png"/>
                        <img class="nexus-hover" src="@/assets/img/design/titles/nexus-hover.png"/>
                    </div>
                    <v-flex xs12>
                        <v-card class="patterned">
                            <v-card-text>Bienvenue dans la base de données de documents du Royaume de Nelva</v-card-text>
                        </v-card>
                        <hr>
                    </v-flex>
                </v-flex>
                <v-flex xs12>
                    <v-layout align-center row wrap v-if="this.$session.get('discordUser')">
                        <v-flex xs2 offset-xs4>
                            <v-btn ref="document" :disabled="this.creatingDocument" color="info" @click="createDocument"><v-icon>add</v-icon> Nouveau document</v-btn>
                        </v-flex>
                        <v-flex xs2>
                            <v-btn ref="category" :disabled="this.creatingCategory" color="info" @click="createCategory"><v-icon>add</v-icon> Nouvelle catégorie</v-btn>
                        </v-flex>
                    </v-layout>
                    <div v-if="this.creatingDocument" class="document-creator">
                        <v-layout align-left row wrap>
                            <v-flex xs12>
                                <v-card class="patterned padded">
                                    <v-text-field v-model="title" label="Titre" required></v-text-field>
                                    <v-text-field v-model="description" label="Description" required></v-text-field>
                                    <input name="image" type="file" ref="image"/>
                                    <br>
                                    <br>
                                    <v-select v-model="category" :items="categories" item-text="title" item-value="id" label="Catégorie"></v-select>
                                    <div v-if="category == '167718540'">
                                        <v-select v-model="course.type" :items="type" item-text="text" item-value="value" label="Type de cours"></v-select>
                                        <v-select v-model="course.rank" :items="ranks" item-text="text" item-value="value" label="Rang du cours"></v-select>
                                        <v-select v-model="course.order" :items="order" item-text="text" item-value="value" label="Disposition"></v-select>
                                    </div>
                                    <textarea id="editor"></textarea>
                                    <v-btn color="primary" @click="newDocument">Valider</v-btn>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </div>
                    <div  v-else-if="this.creatingCategory" class="category-creator">
                        <v-card class="patterned padded">
                            <div class="categories">
                                <v-chip color="primary" close text-color="white" @input="removeCategory(category.id)" v-for="category in this.categories" :key="category.id">{{ category.title }}</v-chip>
                            </div>
                            <v-flex xs4 offset-xs4>
                                <v-text-field label="Catégorie" v-model="category"></v-text-field>
                                <v-btn color="primary" @click="newCategory">Valider</v-btn>
                            </v-flex>
                        </v-card>
                    </div>
                    <div v-else class="grid">
                        <div class="document" v-for="doc in this.documents" :key="doc.slug" @click="openDocument(doc.slug)">
                            <div class="doc-img">
                                <img :src="doc.image || require('@/assets/img/default.png')" />
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
            creatingDocument: false,
            title: '',
            description: '',
            type: [
                { text: 'Militaire', value: 0 },
                { text: 'Economie', value: 1 },
                { text: 'Diplomatie', value: 2 },
                { text: 'Leadership', value: 3 }
            ],
            ranks: [
                { text: '5 -> 4', value: 5 },
                { text: '4 -> 3', value: 4 },
                { text: '3 -> 2', value: 3 },
                { text: '2 -> 1', value: 2 },
            ],
            order: [],
            course: {
                slug: '',
                rank: 5,
                type: 0,
                order: ''
            }
        }
    },
    mounted() {
        this.initialize();
    },
    methods: {
        initialize() {
            api.getNexus(this.$store.state.token).then(response => {
                this.documents = response.data;
            }).catch(error => {
                this.error.state = true;
                this.error.message = error.message;
            });
            api.getCategories(this.$store.state.token).then(response => {
                this.categories = response.data || [];
            });
            api.getCourses(this.$store.state.token).then(response => {
                response.data.forEach(course => {
                    api.getDocument(this.$store.state.token, course.slug).then(document => {
                        this.order.push({ text: 'Après ' + document.data.title, value: course.order + 1 });
                    });
                });
            });
        },

        openDocument(slug) {
            this.$router.push({ name: 'document', params: { slug: slug }});
        },

        createDocument() {
            this.creatingDocument = true;
            this.creatingCategory = false;
            this.loadEditor();
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

        newDocument() {
            if(this.$refs.image.files && this.$refs.image.files[0]) {
                const reader = new FileReader();
                reader.onload = event => {
                    const document = {
                        category: this.category,
                        slug: this.slug(this.title),
                        title: this.title,
                        description: this.description,
                        // eslint-disable-next-line
                        content: CKEDITOR.instances['editor'].getData(),
                        image: event.target.result,
                        created: new Date(),
                        author: this.$session.get('discordUser').id
                    };
                    if(document.category == '167718540') {
                        api.insertCourse(this.$store.state.token, {
                            slug: document.slug,
                            rank: this.course.rank,
                            type: this.course.type,
                            order: this.course.order || 0
                        });
                    }
                    api.insertDocument(this.$store.state.token, document).then(() => {
                        this.initialize();
                    });
                    this.creatingDocument = false;
                };
                reader.readAsDataURL(this.$refs.image.files[0]);
            } else {
                const document = {
                    category: this.category,
                    slug: this.slug(this.title),
                    title: this.title,
                    description: this.description,
                    // eslint-disable-next-line
                    content: CKEDITOR.instances['editor'].getData(),
                    created: new Date(),
                    author: this.$session.get('discordUser').id
                };
                if(document.category == '167718540') {
                    api.insertCourse(this.$store.state.token, {
                        slug: document.slug,
                        rank: this.course.rank,
                        type: this.course.type,
                        order: this.course.order || 0
                    });
                }
                api.insertDocument(this.$store.state.token, document).then(() => {
                    this.initialize();
                });
                this.creatingDocument = false;
            }
        },

        slug(title) {
            const slug = title.replace(new RegExp(' ', 'g'), '-');
            return slug.replace(/[^\w-]/gi, '');
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
        },

        loadEditor() {
            let ckeditorScript = document.createElement('script');
            ckeditorScript.setAttribute('src', 'https://cdn.ckeditor.com/4.6.2/full/ckeditor.js');
            document.head.appendChild(ckeditorScript);
            ckeditorScript.onload = () => {
                if(typeof CKEDITOR !== 'undefined') {
                    const config = {
                        toolbar: [
                            { name: 'document', items: [ 'Print' ] },
                            { name: 'clipboard', items: [ 'Undo', 'Redo' ] },
                            { name: 'styles', items: [ 'Format', 'Font', 'FontSize' ] },
                            { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'RemoveFormat', 'CopyFormatting' ] },
                            { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
                            { name: 'align', items: [ 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ] },
                            { name: 'links', items: [ 'Link', 'Unlink' ] },
                            { name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote' ] },
                            { name: 'insert', items: [ 'Image', 'Table' ] },
                            { name: 'tools', items: [ 'Maximize' ] },
                            { name: 'editing', items: [ 'Scayt' ] }
                        ],
                        customConfig: '',
                        disallowedContent: 'img{width,height,float}',
                        extraAllowedContent: 'img[width,height,align]',
                        height: 950,
                        contentsCss: [ 'https://cdn.ckeditor.com/4.6.1/full-all/contents.css', '/assets/style/document.css' ],
                        bodyClass: 'document-editor',
                        format_tags: 'p;h1;h2;h3;pre',
                        removeDialogTabs: 'image:advanced;link:advanced',
                        stylesSet: [
                            { name: 'Marker', element: 'span', attributes: { 'class': 'marker' } },
                            { name: 'Cited Work', element: 'cite' },
                            { name: 'Inline Quotation', element: 'q' },
                            {
                                name: 'Special Container',
                                element: 'div',
                                styles: {
                                    padding: '5px 10px',
                                    background: '#eee',
                                    border: '1px solid #ccc'
                                }
                            },
                            {
                                name: 'Compact table',
                                element: 'table',
                                attributes: {
                                    cellpadding: '5',
                                    cellspacing: '0',
                                    border: '1',
                                    bordercolor: '#ccc'
                                },
                                styles: {
                                    'border-collapse': 'collapse'
                                }
                            },
                            { name: 'Borderless Table', element: 'table', styles: { 'border-style': 'hidden', 'background-color': '#E6E6FA' } },
                            { name: 'Square Bulleted List', element: 'ul', styles: { 'list-style-type': 'square' } }
                        ]
                    };
                    // eslint-disable-next-line
                    CKEDITOR.replace('editor', config);
                }
            }
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

.padded {
    padding: 20px;
}
.logo-wrap {
    position: relative;
}
.nexus-hover {
    position: absolute;
    left: 400px;
    transition: 250ms;
    z-index: -1;
    opacity: 0;
}
.nexus-img {
    transition: 250ms;
}
.nexus-img:hover {
    opacity: 0;
}
.nexus-img:hover ~ .nexus-hover {
    opacity: 1;
}
</style>
