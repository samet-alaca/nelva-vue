<template lang="html">
	<v-container align-center grid-list-xl>
		<v-layout row wrap>
			<v-flex xs12>
				<img class="logo" src="@/assets/img/logo.png"/>
			</v-flex>
			<v-flex xs12>
				<v-card class="patterned">
					<v-card-text>Nelva est une alliance ouverte sur le monde, reposant sur la responsabilité individuelle dans la recherche et l'accomplissement de soi. Idéologie politique fondamentale : c'est dans le bonheur des membres que sont créées l’activité et l'énergie nécessaire àmener des projets bénéfiques à la communauté entière. Le gouvernement doit donc œuvrer d'abord pour le bien de ses membres, et non pour lui même.</v-card-text>
				</v-card>
			</v-flex>
			<v-flex xs12>
				<img class="img" src="@/assets/img/design/titles/values.png"/>
			</v-flex>
			<v-flex md4>
				<v-card class="unified-card">
					<v-card-title primary-title class="card-title text-xs-center">
						<h3 class="headline">Education</h3>
					</v-card-title>
					<v-card-text>
						La volonté active et éternelle de progresser. Un joueur n'est jamais parfait, n'est jamais au bout du chemin qui le mène à découvrir, apprendre, évoluer, et s'adapter. Cela inclue le niveau de jeu, bien entendu, mais pas seulement. L'apprentissage de soi dans cette longue route aide à faire la différence entre la fierté de ce qui est accompli, et l'arrogance de ce qu'on croit ne plus avoir à faire.
					</v-card-text>
				</v-card>
			</v-flex>
			<v-flex md4>
				<v-card class="unified-card">
					<v-card-title primary-title class="card-title text-xs-center">
						<h3 class="headline">Vaillance</h3>
					</v-card-title>
					<v-card-text>
						La volonté de protéger et d'être digne. Même le joueur le plus humble par le niveau mérite un grand respect s'il s'est battu loyalement, intensément, et avec toute sa sincérité, sans chercher la facilité ou le doux confort de la fuite. Les Nelva essaient en tout conflit et en toute compétition de suivre l'adage de Coubertin : Le triomphe est moins triomphal que le combat. L'important n'est pas de vaincre, mais de se battre bien.
					</v-card-text>
				</v-card>
			</v-flex>
			<v-flex md4>
				<v-card class="unified-card">
					<v-card-title primary-title class="card-title text-xs-center">
						<h3 class="headline">Bienveillance</h3>
					</v-card-title>
					<v-card-text>
						La volonté de transmettre et de partager. Les valeurs d'éducation et de vaillance permettent à un joueur de se réclamer "bon". Veiller à ce que d'autres puissent bénéficier de l'apprentissage de cette éducation et cette vaillance, cela représente le pivot par lequel un joueur ne se suffit plus simplement au qualificatif de "bon", mais de "grand". Et Nelva croit que l'aspiration de tout joueur est de devenir grand, plutôt que bon.
					</v-card-text>
				</v-card>
			</v-flex>
			<v-flex>
				<hr>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {
	name: 'Home'
}
</script>

<style lang="css">
.card.patterned {
	background-color: #F5F1EA;
}

.unified-card {
	height: 100% !important;
}

.card {
	box-shadow: 4px 4px 6px rgba(0, 0, 0, .4);
	font-size: 15px;
}



</style>
