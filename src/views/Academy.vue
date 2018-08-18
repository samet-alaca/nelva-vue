<template lang="html">
    <v-container align-center grid-list-xl>
        <v-layout row wrap>
            <v-flex>
                <img src="@/assets/img/design/titles/academy.png"/>
                <v-flex>
                    <v-card class="patterned">
                        <v-card-text>Bienvenue dans la base de données éducatives publique de Nelva. Cette base de donnée, qui a vocation à s'enrichir, sert aussi à la validation des compétences en Nelva. Si vous n'êtes pas Nelva, la seule différence est que vous ne pourrez pas être entraînés sur les points évoqués → la théorie ne remplace pas la pratique.</v-card-text>
                    </v-card>
                </v-flex>
                <v-layout row wrap>
                    <v-flex xs3>
                        <v-card class="patterned">
                            <v-card-title primary-title class="card-title text-xs-center">
                                <img class="course-title" src="@/assets/img/design/titles/military.png">
                            </v-card-title>
                            <v-card-text>
                                <img class="course-type" src="@/assets/img/military.jpg">
                            </v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex xs3>
                        <v-card class="patterned">
                            <v-card-title primary-title class="card-title text-xs-center">
                                <img class="course-title" src="@/assets/img/design/titles/economy.png">
                            </v-card-title>
                            <v-card-text>
                                <img class="course-type" src="@/assets/img/economy.jpg">
                            </v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex xs3>
                        <v-card class="patterned">
                            <v-card-title primary-title class="card-title text-xs-center">
                                <img class="course-title" src="@/assets/img/design/titles/diplomacy.png">
                            </v-card-title>
                            <v-card-text>
                                <img class="course-type" src="@/assets/img/diplomacy.jpg">
                            </v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex xs3>
                        <v-card class="patterned">
                            <v-card-title primary-title class="card-title text-xs-center">
                                <img class="course-title" src="@/assets/img/design/titles/leadership.png">
                            </v-card-title>
                            <v-card-text>
                                <img class="course-type" src="@/assets/img/leadership.jpg">
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'Academy'
}
</script>

<style lang="css">
.course-type, .course-title {
    width: 100%;
    height: auto;
}
</style>
