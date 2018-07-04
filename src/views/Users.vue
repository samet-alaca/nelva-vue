<template lang="html">
	<v-container align-center grid-list-xl>
		<v-layout row wrap>
			<v-flex xs12>
				<img src="@/assets/img/design/titles/users.png"/>
			</v-flex>
			<v-flex md4>
				<div class="user-container">
					<div class="user" v-for="member in users.admins" :key="member.user.id">
						<router-link :to="{ name: 'user', params: { id: member.user.id } }">
							<v-tooltip top>
								<div class="user-avatar" slot="activator">
									<img :src="avatar(member.user)"/>
									<div class="status-wrapper">
										<div :class="'status status-' + member.user.presence.status"></div>
									</div>
								</div>
								<span class="tooltip" v-html="member.nickname || member.user.username"></span>
							</v-tooltip>
						</router-link>
					</div>
				</div>
			</v-flex>

			<v-flex md4>
				<div class="user-container">
					<div class="user" v-for="member in users.members" :key="member.user.id">
						<router-link :to="{ name: 'user', params: { id: member.user.id } }">
							<v-tooltip top>
								<div class="user-avatar" slot="activator">
									<img :src="avatar(member.user)"/>
									<div class="status-wrapper">
										<div :class="'status status-' + member.user.presence.status"></div>
									</div>
								</div>
								<span class="tooltip" v-html="member.nickname || member.user.username"></span>
							</v-tooltip>
						</router-link>
					</div>
				</div>
			</v-flex>

			<v-flex md4>
				<div class="user-container">
					<div class="user" v-for="member in users.visitors" :key="member.user.id">
						<router-link :to="{ name: 'user', params: { id: member.user.id } }">
							<v-tooltip top>
								<div class="user-avatar" slot="activator">
									<img :src="avatar(member.user)"/>
									<div class="status-wrapper">
										<div :class="'status status-' + member.user.presence.status"></div>
									</div>
								</div>
								<span class="tooltip" v-html="member.nickname || member.user.username"></span>
							</v-tooltip>
						</router-link>
					</div>
				</div>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import config from '@/../config';

export default {
	name: 'Members',
	data() {
		return {
			users: {
				admins: [],
				members: [],
				visitors: []
			},
			defaultAvatars: [
				'https://discordapp.com/assets/1cbd08c76f8af6dddce02c5138971129.png',
				'https://discordapp.com/assets/6debd47ed13483642cf09e832ed0bc1b.png',
				'https://discordapp.com/assets/dd4dbc0016779df1378e7812eabaa04d.png',
				'https://discordapp.com/assets/0e291f67c9274a1abdddeb3fd919cbaa.png'
			]
		}
	},
	created() {
		const guild = this.$store.state.discord.guilds.find('id', config.discord.guild);
		this.users.admins = guild.members.filter(member => member.roles.has(config.discord.roles.admin)).array();
		this.users.members = guild.members.filter(member => member.roles.has(config.discord.roles.member) && !member.roles.has(config.discord.roles.admin)).array();
		this.users.visitors = guild.members.filter(member => member.roles.has(config.discord.roles.visitor)).array();
	},
	methods: {
		avatar(user) {
			return user.avatar ? 'https://cdn.discordapp.com/avatars/' + user.id + '/' + user.avatar : this.defaultAvatars[Math.floor(Math.random() * 3)];
		}
	}
}
</script>

<style lang="css">
.user-container {
	display: flex;
	align-items: center;
	justify-content: space-around;
	flex-wrap: wrap;
}

.user, .user img {
	transition: 250ms;
	cursor: pointer;
}

.user:hover img {
	filter: grayscale(100%);
}

.tooltip {
	color: white;
}

.user-avatar, .user-avatar > img {
	width: 64px;
	height: 64px;
	border-radius: 100%;
}

.user-avatar {
	margin: 5px;
}

.status-wrapper {
	position: absolute;
	bottom: 5px;
	left: 55px;
	padding: 0px;
	box-shadow: 0 0 0 2px #4a69bd;
	border-radius: 100%;
}

.status {
	position: relative;
	min-height: 12px;
	padding-left: 6px;
	padding-right: 6px;
	border-radius: 100%;
}

.status-online { background-color: #43B581; }
.status-idle { background-color: #FAA61A; }
.status-dnd { background-color: #F04747; }
.status-offline { background-color: #747F8D; }
</style>
