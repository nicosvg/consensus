<template>
	<div class="elections">
		Elections list
		<div v-for="election in elections" :key="election.id">
			{{ election.name }}
		</div>
	</div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Elections',
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
        const response = await axios.get('http://localhost:8000/elections')
        return response.data
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
