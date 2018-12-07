<template>
	<div class="elections">
		<div>Elections list!</div>
		<button @click="findAllElections">Refresh</button>
		<div v-for="election in elections" :key="election.id">
			{{ election.name }}
		</div>
		<add-election></add-election>
	</div>
</template>

<script>
  import axios from 'axios'
  import AddElection from './AddElection'
  import config from '../config'

  export default {
    name: 'Elections',
    components: {AddElection},
    props: {},
    data() {
      return {
        elections: []
      }
    },
    created() {
      this.findAllElections()
    },
    methods: {
      async findAllElections() {
        const response = await axios.get(config.rootApi + '/elections')
        this.elections = response.data
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.elections {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
