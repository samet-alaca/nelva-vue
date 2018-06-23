<template>
    <v-app>
        <Toolbar></Toolbar>
    </v-app>
</template>

<script>
import 'vuetify/dist/vuetify.min.css';
import Toolbar from './components/Toolbar.vue';

export default {
    name: 'app',
    components: {
        Toolbar
    }
}
</script>

<style></style>
