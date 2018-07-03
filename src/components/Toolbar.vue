<template lang="html">
    <v-toolbar>
        <v-toolbar-title class="toolbar-title">
            <router-link :to="{ name: 'home' }">
                <img class="toolbar-logo" src="@/assets/img/logo.png"/>
            </router-link>
        </v-toolbar-title>
        <v-toolbar-items class="toolbar-items hidden-sm-and-down">
            <router-link :to="{ name: 'join' }">Nous rejoindre</router-link>
            <router-link :to="{ name: 'members' }">Membres</router-link>
            <router-link :to="{ name: 'academy' }">Académie</router-link>
            <router-link :to="{ name: 'nexus' }">Nexus</router-link>
            <router-link :to="{ name: 'cinelva' }">Cinelva</router-link>
            <router-link :to="{ name: 'chronicles' }">Chroniques</router-link>
            <router-link :to="{ name: 'admin' }">Admin</router-link>
        </v-toolbar-items>
        <v-spacer></v-spacer>
    </v-toolbar>
</template>

<script>
export default {
    name: 'Toolbar',
    components: {

    }
};
</script>

<style lang="css">
nav.toolbar {
	background-color: #F5F1EA !important;
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

/* Trick for line-height: 100% */
.toolbar-items > a:before {
    content: "";
    display: inline-block;
    height: 100%;
    vertical-align: middle;
}

.toolbar-items > a {
    padding: 0 10px;
    font-family: 'BuiltTitling';
    text-transform: uppercase;
    font-size: 30px;
    text-decoration: none;
    text-transform: uppercase;
    color: #565656;
    background-color: #F5F1EA;
    transition: 250ms;
}

.toolbar-items > a:hover:not(.router-link-active) {
    color: #9B9EA2;
}

.toolbar-items > .router-link-active {
    background-color: #9B9EA2;
    color: #F5F1EA;
}
</style>
