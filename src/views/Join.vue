<template lang="html">
    <v-container align-center grid-list-xl>
        <v-layout row wrap>
            <v-flex>
                <img class="logo" src="@/assets/img/logo.png"/>
            </v-flex>
            <v-flex>
                <v-card class="patterned">
                    <v-card-text>Voici quelques informations à saisir de l’alliance, avant d’envisager de nous demander de nous rejoindre comme citoyen. Si tu es juste intéressé par Nelva comme visiteur, alors ces informations serviront juste à ce que tu comprennes mieux où tu mets les pieds 😊</v-card-text>
                </v-card>
            </v-flex>
            <v-flex>
                <v-card class="text-xs-left patterned clearfix pad20">
                    <iframe class="widget" src="https://discordapp.com/widget?id=281489896563277825&theme=dark" width="300" height="428" allowtransparency="true" frameborder="0"></iframe>
                    <a href="https://discord.gg/8Enn2bh" class="discord-btn"><i class="icon icon-discord"></i> Rejoindre le discord</a>
                    <br><br>
                    Avant de nous présenter, voici notre devise : « Education, Vaillance, Bienveillance ».
                    <br><br>Ce sont les trois piliers du Royaume.
                    <br>
                    <ul>
                        <li><b>Education</b> : Apprendre et rester humble, quelque soit son niveau.</li>
                        <li><b>Vaillance</b> : Combattre bravement, surtout contre les traitres et les gmeurs. Ne pas fuir, ne pas négocier, face à ces individus.</li>
                        <li><b>Bienveillance</b> : Aider les autres à s’améliorer, encourager leur vaillance, protéger des traitres et gmeurs.</li>
                    </ul>
                    <br>
                    Au fil des ans et des expériences engrangées, Le Royaume de Nelva a mis en place une Constitution et une série d’outils administratifs, de divertissements et de communication au service de ses citoyens. On y retrouve également un Gouvernement, constitué du Roi et de ses ministres.
                    <br><br>Cependant, Nelva n’est pas seulement une alliance ; c’est également un lieu d’apprentissage et d’éducation. En effet, l’une de nos missions « in game » est d’aider les joueurs méritants, honorables et désireux d’apprendre à s’améliorer.
                    <br><br>Nos institutions :
                    <ul>
                        <li>Notre Constitution : Nous disposons d’une Constitution exhaustive et rédigée avec soin. La lecture n’est pas obligatoire, mais en voici la version simplifiée et facile à comprendre : <router-link :to="{ name: 'document',  params: { slug: 'charte-de-nelva' }}">Charte nelva</router-link>
                            <br>
                            Si jamais tu n’as pas cliqué sur le lien, voici ce qui te concernera le plus : « Si tu veux faire une 500, tu dois choisir auparavant un binôme, vous jouerez en alliés. Vérifie également que tu n’as pas une autre 500 de moins de 60 jours »
                        </li>
                        <br>
                        <li>Nos rangs : de rang 5 à rang 1. Les rang 5 sont des joueurs débutants ou n’ayant que peu de connaissances des mécanismes du jeu. Plus le rang tend vers 1 et plus le niveau de jeu est élevé. Les rangs 1 sont nos « maitres d’armes » et nos meilleurs combattants. Le rang d’un joueur est considéré selon plusieurs critères et déterminés lors des parties jouées et des internes.</li>
                        <br><li>Notre <a href="https://discord.gg/8Enn2bh" target="_blank">serveur sur Discord</a>. C’est ici que vit le Royaume. Tous les citoyens, les membres Honoris Causa et visiteurs y sont présents. Notre serveur possède de nombreux canaux de discussion consacrés à des activités diverses et variées. Il possède également des fonctions vocales pour ceux qui désirent s’entendre ou ceux qui l’utilisent lors de session de jeux. Cependant, les deux canaux les plus importants sont ceux du bar, où tout le monde est libre de s’exprimer sur les sujets qu’il souhaite et celui du Gouvernement.</li>
                        <br><li>Notre Gouvernement : Il est composé de notre Roi et de ses ministres. Le Gouvernement représente le cœur du Royaume et son administration. Il règle les problèmes entre joueurs, il organise les internes, etc. Les choix du gouvernement sont également votés par les citoyens dont l’opinion est prise en compte. Le Gouvernement possède son propre canal de discussion sur Discord où seuls ses membres peuvent parler. En revanche, le canal « Gouvernement » peut être lu par chacun.</li>
                        <br><li>Notre bestiaire : Le bestiaire est une commande sur Discord permettant de publier et d’enregistrer des informations sur des joueurs croisés lors de nos parties. Le bestiaire permet donc de retrouver les dits joueurs et de savoir s’ils sont dignes de confiance ou pas.
                        </li>
                        <br><li>Notre <router-link :to="{ name: 'cinelva' }">Cinelva</router-link> :  Cinelva fonctionne comme un cinéma mais il est gratuit et se fait entre citoyens de Nelva. Il suffit de proposer un film, d’organiser une séance et le tour est joué. Regarder un film entre copains sans avoir besoin de les inviter chez soi, c’est possible avec Cinélva !</li>
                    </ul>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'Join'
}
</script>

<style lang="css">
ul {
    list-style: disc inside none;
}

.pad20 {
    padding: 20px;
}

.widget {
    float: left;
    margin-right: 40px;
    margin-bottom: 20px;
}

.discord-btn {
    font-size: 43px;
    padding: 15px;
    background-color: #7289DA;
    border: 2px solid #7289DA;
    color: white;
    border-radius: 7px !important;
    transition: 250ms;
    text-decoration: none;
}

.icon-discord {
    background: url('../assets/img/discord.svg');
    background-repeat: no-repeat;
    background-position: center;
    height: 55px;
    width: 55px;
    vertical-align: middle;
}

.discord-btn:hover {
    box-shadow: 3px 3px 9px #2C2F33;
}

.clearfix {
    overflow: auto;
}
</style>
