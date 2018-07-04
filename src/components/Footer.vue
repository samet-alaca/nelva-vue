<template lang="html">
	<v-footer height="auto">
		<v-card flat tile class="text-xs-center fill patterned">
			<v-card-text>
				<a class="footer-icon" href="https://discord.gg/8Enn2bh" target="_blank">
					<img src="@/assets/img/design/discord.png">
				</a>
				<a class="footer-icon" href="https://www.supremacy1914.fr/index.php?id=188&L=11" target="_blank">
					<img src="@/assets/img/design/supremacy.png">
				</a>
				<a class="footer-icon" href="https://www.conflictnations.com/" target="_blank">
					<img src="@/assets/img/design/conflictofnations.png">
				</a>
				<a class="footer-icon" href="https://fr.callofwar.com/index.php?id=304&L=11" target="_blank">
					<img src="@/assets/img/design/callofwar.png">
				</a>
			</v-card-text>

			<v-divider></v-divider>

			<v-card-text>
				&copy; {{ new Date().getFullYear() }} — <strong>Nelva</strong> by <a href="https://samet-alaca.fr" target="_blank">Samet Alaca</a>
			</v-card-text>
		</v-card>
	</v-footer>
</template>

<script>
export default {
	name: 'Footer'
}
</script>

<style lang="css" scoped>
.fill {
	width: 100%;
}

.footer-icon, .footer-icon > * {
	width: 48px;
	height: auto;
	vertical-align: middle;
	transition: 250ms
}

.footer-icon:not(:last-child) {
	margin-right: 15px;
}

.footer-icon:hover > * {
	transform: rotate(-30deg);
}
</style>
