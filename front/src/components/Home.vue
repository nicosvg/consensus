<template>
	<div class="home">
		<div class="home-title">CONSENSUS</div>
		<div class="home-subtitle">Votez, c'est cool</div>
		<button @click="seeElections" class="elections-list-button">Voir les élections en cours</button>
	</div>
</template>

<script>
  export default {
    name: 'Home',
    methods: {
      seeElections() {
        this.$router.push({name: 'electionsList'})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	@import "../scss/variables.scss";

	.home {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;

		.home-title {
			font-family: 'Bellefair', serif;
			color: $dark;
			font-size: 3.5em;
		}

		.home-subtitle {
			color: $dark;
			font-size: 1em;
		}

		.elections-list-button {
			margin-top: 5em;
			background-color: $blue;
			border: none;
			color: $dark;
			padding: 15px 32px;
			text-align: center;
			text-decoration: none;
			display: inline-block;
			font-size: 16px;
			font-weight: lighter;
		}
	}

</style>
