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
import NavAuth from '@/components/NavAuth.vue';

export default {
    name: 'Toolbar',
    components: {
        NavAuth
    }
};
</script>

<style lang="css">
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

/* Trick for line-height: 100% */
.toolbar-items > a:before {
    content: "";
    display: inline-block;
    height: 100%;
    vertical-align: middle;
}

.toolbar-items > a {
    padding: 0 10px;
    font-family: 'Charlemagne';
    font-size: 17px;
    text-decoration: none;
    text-transform: uppercase;
    color: #565656;
    background: url('../assets/img/design/patterns/gray.png') repeat;
    transition: 250ms;
}

.toolbar-items > a:hover {
    background: url('../assets/img/design/patterns/blue.png') repeat;
}

.toolbar-items > .router-link-active {
    background: url('../assets/img/design/patterns/gold.png') repeat;
}
</style>
