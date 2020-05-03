<template>
  <div>
    <h2>Add a new election</h2>
    <div>
      <label for="new-election-name">Name</label>
      <input id="new-election-name" v-model="name" placeholder="name" />
    </div>
    <EditCandidates :candidates="candidates" />
    <button v-on:click="create()">Save</button>
  </div>
</template>

<script>
import axios from "axios";
import config from "../config";
import EditCandidates from "@/components/EditCandidates";

export default {
  name: "AddElection",
  components: { EditCandidates },
  props: {},
  data() {
    return {
      name: "",
      description: "",
      candidates: []
    };
  },
  methods: {
    async create() {
      const election = {
        name: this.name,
        description: this.description,
        candidates: this.candidates
      };
      console.log("Saving... ", election.candidates[0].name);
      const result = await axios.post(config.rootApi + "/elections", election);
      if (result.status === 201) {
        this.$router.push({ name: "electionsList" });
      } else {
        console.error("Save failed!!", result);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
