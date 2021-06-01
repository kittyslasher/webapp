<template>
<div>
<div class="bg-image"></div>
<v-container fluid class="home_page">
  <v-row style="height:10vh;" class="mt-5"></v-row>

  <v-row fluid class="main_row">
    <v-col cols="3" md="3"></v-col>
    <v-col cols="6" md="6" align="center" justify="center">
      <div class="logo"></div>
    </v-col>
    <v-col cols="3" md="3"></v-col>
  </v-row>

  <v-row style="height:2vh;" class="mt-1 mb-5">
	<v-col cols="12" md="12" align="center" justify="center">
		<p style="font-family:Roboto;font-size:1.6em;font-weight:700;color:#E9EBEE !important;">The Ultimate Fandom Crypto Collection and Game</p>
	</v-col>
  </v-row>
  
  <v-row style="height:5vh;" class="mt-1"></v-row>

  <v-row fluid style="height:20vh;width:50vw;margin:auto;" class="mt-10">
	<v-col cols="4" md="4" align="center" justify="center">
		<nuxt-link to="/crowdsales" class="crwd-item">
			<v-row align="center" justify="center" style="height:100%;width:100%" class="crwd-item-row">
				<v-col cols="9" md="9" align="center" style="padding:0;">
					<h4 style="font-size:1.6em;" class="crwd-item-pokename">Catch 'em</h4>
				</v-col>
				<v-col cols="3" md="3" align="start" justify="start" style="padding:0;">
					<img style="padding-top: 10%;" class="poke_icon_index" :src="require('@/assets/img/moved_colored_icons/151_mew.png')" />
				</v-col>
			</v-row>
		</nuxt-link>
	</v-col>
	<v-col cols="4" md="4" align="center" justify="center">
		<nuxt-link to="/pokeballs" class="crwd-item">
			<v-row align="center" justify="center" style="height:100%;width:100%" class="crwd-item-row">
				<v-col cols="9" md="9" align="center" style="padding:0%;">
					<h4 style="font-size:1.6em;" class="crwd-item-pokename">Pokéballs</h4>
				</v-col>
				<v-col cols="3" md="3" align="start" justify="start" style="padding:0;">
					<img style="padding-top: 10%;" class="poke_icon_pokeballs" :src="require('@/assets/img/webiste_imgs/pokeball_256.png')" />
				</v-col>
			</v-row>
		</nuxt-link>
	</v-col>
	<v-col cols="4" md="4" align="center" justify="center">
		<a href="https://www.notion.so/pokeswap/Pokeswap-org-Wiki-02330ca586fc41bda35aa7cbb1c551d8" target="_blank" class="crwd-item">
			<v-row align="center" justify="center" style="height:100%;width:100%" class="crwd-item-row">
				<v-col cols="9" md="9" align="center" style="padding:0%;">
					<span style="font-size:1.6em;" class="crwd-item-pokename">Wiki</span>
				</v-col>
				<v-col cols="3" md="3" align="start" justify="start" style="padding:0;">
					<img style="padding-top: 10%;" class="poke_icon_index" :src="require('@/assets/img/detective.png')" />
				</v-col>
			</v-row>
		</a>
	</v-col>
	</v-col>
  </v-row>

  <v-row style="height:8vh;" class="mt-1"></v-row>

  <v-row style="height:2vh;" class="mb-1">
	<v-col cols="12" md="12" align="center" justify="center">
		<p style="font-family:Roboto;font-size:1.4em;font-weight:500;color:#E9EBEE !important;">Join our community</p>
	</v-col>
  </v-row>

  <v-row style="height:10vh;" class="mt-10">
	<v-col cols="3" md="3"></v-col>
    <v-col cols="6" md="6" align="center" justify="start">
      	<div class="ml-1 pa-0 mt-0" style="display:inline-block;height:100%;width:10%">
		<a target="_blank" style="color:inherit;" href="https://github.com/pokeswapper/pokeswapper.github.io/"  >
			<v-img
				alt="github"
				class="shrink mr-0 ml-md-n4"
				contain
				:src="require('~/assets/img/git-logo.png')"
				transition="scale-transition"
				width="55"
				/>
		</a>
		</div>
		<div class="ml-2 mt-0" style="display:inline-block;height:100%;width:10%"> 
		<a target="_blank" style="color:inherit;" href="https://discord.com/invite/r22r88PVzD"  >
			<v-img
				alt="discord"
				class="shrink mr-0 ml-md-n4"
				contain
				:src="require('~/assets/img/discord-logo.png')"
				transition="scale-transition"
				width="44"
				/>
		</a>
		</div>
		<div class="ml-3 mt-0" style="display:inline-block;height:100%;width:10%;">
		<a target="_blank" style="color:inherit;" href="https://www.twitter.com/PokeswapO"  >
			<v-img
				alt="twitter"
				class="shrink mr-0 ml-md-n4"
				contain
				:src="require('~/assets/img/twitter.jpg')"
				transition="scale-transition"
				width="46"
			/>
		</a>
		</div>
    </v-col>
    <v-col cols="3" md="3"></v-col>
  </v-row>
</v-container>
</div>
</template>

<script>
import PokeSaleList from './poke-sale-list.vue';
import TransferActivityTable from './transfer-activity-table.vue';

import PokeDex from '../bd/poke-dex.json';

export default {
	name: 'home-page',
	components: { PokeSaleList, TransferActivityTable },
	data() {
		return {}
	},
	mounted() {},
	methods : {}
}
</script>

<style>

.bg-image {
	z-index: 0;
	position: fixed;
	height: 100%;
	width: 100vw;
	top: 0;
	left: 0;
	overflow: hidden;
	/* The image used */
	background-image: url('~/assets/home-background.jpg');
	/* Center and scale the image nicely */
	background-position: center;
	background-repeat: no-repeat;
	background-size: 100% 100%;
}

.blur-image {
	/* Add the blur effect */
	filter: blur(4px);
	-webkit-filter: blur(2px);
	overflow: hidden;
}

.home_page {
	z-index: 1;
	position: fixed;
	height: 100%;
	top: 0%;
	left: 0;
	margin: 0;
	padding: 0;
	background-color: transparent;
}

.main_row {
	height: 28%;
	margin: 0;
}

.logo {
	text-align: center;
	background-image: url('~/assets/PoKeSwAp.png');
	background-repeat: no-repeat;
	background-size: 80% 100%;
	background-position: center;
	position: relative;
	height: 100%;
	width: 100%;
}

.crwd-item {
	text-decoration:none;
	display:inline-block;
	width:100%;
	height:50%;
}

.crwd-item-row {
	padding: 0;
	/*border: 3px solid #386ab8;*/
	box-shadow: 4px 4px #386ab8;
	border-radius: 15px;
	background-color: rgb(247, 248, 250);
}

.crwd-item-row:hover {
	background-color: rgb(247, 248, 250);
	box-shadow: 4px 4px #386ab8;
	border: 3px solid #ffe031;
}

.crwd-item-pokename {
	color:#ffe031;
	text-shadow: 3px 3px #386ab8;
	-webkit-text-stroke: 1px #386ab8;
	font-family: PokemonSolidx !important;
	font-size:1.2em;
	letter-spacing:3px;
}

.poke_icon_index {
	max-width: 60px;
	max-height: 60px;
}

.poke_icon_pokeballs {
	max-width: 50px;
	max-height: 50px;
}
</style>
