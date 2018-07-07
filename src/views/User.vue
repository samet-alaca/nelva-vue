<template lang="html">
	<v-container align-center grid-list-xl>
		<v-layout row wrap>
		</v-layout>
	</v-container>
</template>

<script>
import api from '@/api';

export default {
	name: 'Member',
    data() {
        return {
            user: null,
            error: {
                state: false,
                message: ''
            },
        }
    },
    created() {
        api.getDiscordUser(this.$store.state.token, this.$route.params.id).then(response => {
            this.user = response.data;
            console.log(this.user);
        }).catch(error => {
            this.error.state = true;
            this.error.message = error.message;
        });
    },
}
</script>

<style lang="css">
</style>
