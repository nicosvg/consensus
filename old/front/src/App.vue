<template>
	<div id="app">
		<div class="navbar" v-if="$router.currentRoute.name !== 'home'">
			<div class="nav-item" @click="$router.push({name:'home'})">Accueil</div>
		</div>
		<router-view/>
	</div>
</template>

<script>
  import HelloWorld from './components/HelloWorld.vue'

  export default {
    name: 'app',
    components: {
      HelloWorld
    },
    methods: {}
  }
</script>

<style lang="scss">
	@import "./scss/variables.scss";


	#app {
		font-family: 'Quicksand', sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: $dark;
		margin: 0;
		padding: 0;
		height: 100%;
		background-color: $light;
	}

	button {
		background-color: $blue;
		border: none;
		color: $dark;
		padding: 15px 32px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
		font-weight: lighter;
		cursor: pointer;
	}

	.title-font {
		font-family: 'Bellefair', serif;
	}

	body {
		margin: 0 !important;
		height: 100%
	}

	html {
		height: 100%;
	}

	.navbar {
		display: flex;
		justify-content: end;
		padding-right: 2rem;

		.nav-item {
			padding: 1rem;
			cursor: pointer;
		}
	}


</style>
