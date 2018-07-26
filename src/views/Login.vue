<template lang="html">
    <v-container align-center grid-list-xl>
        <v-layout row wrap>
            <v-layout row wrap v-if="!error.state">
                <v-flex xs12>
                    <v-alert :value="true" type="success">Redirection...</v-alert>
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
import config from '@/../config';

export default {
    name: 'Login',
    data() {
        return {
            error: {
                state: false,
                message: ''
            }
        }
    },
    mounted() {
        const error = error => {
            this.error.state = true;
            this.error.message = error.message;
        };
        api.getDiscordToken(this.$route.query.code).then(response => {
            api.getDiscordGuilds(response.data.access_token).then(guilds => {
                const isMember = guilds.data.filter(el => el.id === config.discord.id).length > 0;
                if(isMember) {
                    this.$session.set('discordToken', response.data.access_token);
                    this.$session.set('refreshToken', response.data.refresh_token);
                    api.getDiscordAuthUser(response.data.access_token).then(response => {
                        this.$session.set('discordUser', response.data);
                        this.$router.go(-2);
                    }).catch(error);
                } else {
                    this.error.state = true;
                    this.error.message = 'Vous n\'êtes pas membre Nelva...';
                }
            });
        }).catch(error);
    }
}
</script>

<style lang="css">
</style>
