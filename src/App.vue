<template lang="html">
    <v-app>
        <Toolbar></Toolbar>
        <v-container grid-list-md>
            <v-layout row wrap>
                <router-view></router-view>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
import 'vuetify/dist/vuetify.min.css';
import Toolbar from '@/components/Toolbar.vue';

export default {
    name: 'app',
    components: {
        Toolbar
    }
};
</script>

<style lang="css">
@font-face {
    font-family: 'Charlemagne';
    src: url('assets/fonts/Charlemagne.otf');
}
</style>
