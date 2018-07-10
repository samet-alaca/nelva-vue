<template lang="html">
    <v-container align-center grid-list-xl>
        <v-layout row wrap>
            <v-flex xs12>
                <Player></Player>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Player from '@/components/Player';

export default {
    name: 'Cinelva',
    components: {
        Player
    }
}
</script>

<style lang="css">
</style>
