<template>
	<div>
		<h2>Add a new election</h2>
		<div>
			<label for="new-election-name">Name</label>
			<input id="new-election-name" v-model="name" placeholder="name"/>
		</div>
		<button v-on:click="create()">Save</button>
	</div>
</template>

<script>
  import axios from 'axios'
  import config from '../config'

  export default {
    name: 'AddElection',
    props: {},
    data() {
      return {
        name: '',
        description: ''
      }
    },
    async created() {
    },
    methods: {
      async create() {
        const election = {
          name: this.name,
          description: this.description
        }
        const response = await axios.post(config.rootApi + '/elections', election)
        console.log('added resultzzz', response)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
