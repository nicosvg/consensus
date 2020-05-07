<template>
  <div class="home">
    <div class="home-title">CONSENSUS</div>
    <div class="home-subtitle">Voter avec le jugement majoritaire</div>

    <div class="enter-code-block">
      <label class="enter-code-label" for="code">Enter a code</label>
      <input id="code" v-model="code" />
      <button @click="searchCode">Search</button>
      <div v-if="isNotFound">Nothing found for this code, please try again</div>
    </div>
    <button @click="seeElections" class="elections-list-button">
      Voir les élections en cours
    </button>
  </div>
</template>

<script>
import { searchElectionByCode } from "@/service";

export default {
  name: "Home",
  data() {
    return {
      code: "",
      isNotFound: false
    };
  },
  methods: {
    seeElections() {
      this.$router.push({ name: "electionsList" });
    },
    async searchCode() {
      this.isNotFound = false;
      const election = await searchElectionByCode(this.code);
      if (election != null) {
        await this.$router.push({
          name: "electionDetails",
          params: { id: election.id }
        });
      } else {
        this.isNotFound = true;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.home-title {
  font-family: "Bellefair", serif;
  color: var(--dark);
  font-size: 3.5em;
}

.home-subtitle {
  color: var(--dark);
  font-size: 1em;
}

.elections-list-button {
  margin-top: 5em;
  background-color: var(--primary);
  border: none;
  color: var(--dark);
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  font-weight: lighter;
}
</style>
