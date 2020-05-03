<template>
  <div>
    <h1>{{ election.name }}</h1>
    <h3>Candidates</h3>
    <div
      v-for="candidate in election.candidates"
      :key="candidate.id"
      class="candidate"
    >
      <div>{{ candidate.name }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import config from "../config";

export default {
  name: "ElectionDetails",
  props: {
    id: String
  },
  data() {
    return {
      election: {}
    };
  },
  async created() {
    const response = await axios.get(config.rootApi + "/elections/" + this.id);
    console.log("response details", response);
    this.election = response.data;
  }
};
</script>

<style scoped></style>
