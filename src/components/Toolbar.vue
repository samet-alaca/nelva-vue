<template>
    <v-toolbar>
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title class="toolbar-title">
            <a href="/">
                <img class="toolbar-logo" src="../assets/img/logo-small.png"/>
            </a>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn>
            <v-icon>more_vert</v-icon>
            Nexus
        </v-btn>
        <NavAuth></NavAuth>
    </v-toolbar>
</template>

<script>
import NavAuth from './NavAuth.vue';

export default {
    name: 'Toolbar',
    components: {
        NavAuth
    }
};
</script>

<style>
nav.toolbar {
    background-image: url('../assets/img/design/patterns/gray.png');
    background-repeat: repeat;
}
div.toolbar-title {
    margin-left: 0px;
    height: 100%;
}

img.toolbar-logo {
    height: calc(100% - 10px);
    margin-top: 5px;
    transition: 250ms;
}

</style>
