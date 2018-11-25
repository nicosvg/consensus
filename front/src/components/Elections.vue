<template>
	<div class="elections">
		Elections list
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
    async created() {
      this.elections = await this.findAllElections()
    },
    methods: {
      async findAllElections() {
        const response = await axios.get(config.rootApi + '/elections')
        return response.data
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
