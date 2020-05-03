<template>
  <div class="elections">
    <div class="elections-title">Elections en cours</div>
    <button @click="createElection" class="create-election-button">
      Créer une nouvelle élection
    </button>
    <div class="list-container">
      <div
        class="elections-item"
        v-for="election in elections"
        :key="election.id"
        @click="seeElectionDetails(election.id)"
      >
        {{ election.name }}
      </div>
    </div>
    <button class="refresh-button" @click="findAllElections">Rafraîchir</button>
  </div>
</template>

<script>
import axios from "axios";
import config from "@/config";

export default {
  name: "Elections",
  props: {},
  data() {
    return {
      elections: []
    };
  },
  created() {
    this.findAllElections();
  },
  methods: {
    async findAllElections() {
      const response = await axios.get(config.rootApi + "/elections");
      this.elections = response.data;
    },
    createElection() {
      this.$router.push({ name: "createElection" });
    },
    seeElectionDetails(id) {
      this.$router.push({ name: "electionDetails", params: { id: id } });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.elections {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3rem;
}

.elections-title {
  font-size: 2rem;
  margin: 1rem;
}

.list-container {
  margin: 2rem;
}

.elections-item {
}

.refresh-button {
  background-color: var(--secondary);
}

.elections-item {
  cursor: pointer;
}
</style>
