<template lang="html">
    <v-app>
        <Toolbar></Toolbar>
        <router-view></router-view>
        <Footer></Footer>
    </v-app>
</template>

<script>
import 'vuetify/dist/vuetify.min.css';
import Toolbar from '@/components/Toolbar.vue';
import Footer from '@/components/Footer.vue';

export default {
    name: 'app',
    components: {
        Toolbar,
        Footer
    }
};
</script>

<style lang="css">
@font-face {
    font-family: 'BuiltTitling';
    src: url('assets/fonts/BuiltTitling.ttf');
}

@font-face {
    font-family: 'Roboto';
    src: url('assets/fonts/Roboto.ttf');
}

.application--wrap {
    background-attachment: fixed;
    background-size: cover;
    background-color: #4a69bd
}

* {
    font-family: 'Roboto';
}

hr {
    border: 0;
    margin: 0 auto;
    height: 70px;
    background-image: url('assets/img/design/hr.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}

.h1 {
    font-family: 'BuiltTitling';
    font-size: 48px;
    margin: 0;
}

@media (min-width: 1900px) {
    .container {
        max-width: 1500px;
        margin: 0 auto;
    }
}
.flex {
    text-align: center;
}

.img {
    width: 60%;
}

button.btn.btn-primary {
    background-color: #3898DB !important;
    color: white;
}

.card-title {
    justify-content: center;
    padding: 15px;
    background-color: #f7f1e3;
    color: #2C2F33;
}

.card-title > * {
    font-family: 'BuiltTitling';
    font-size: 30px !important;
}

.card.patterned {
    background-color: #f7f1e3;
}
</style>
