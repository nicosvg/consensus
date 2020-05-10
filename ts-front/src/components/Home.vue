<template>
  <div class="home">
    <div class="home-title">Consensus</div>
    <div class="home-subtitle">
      Create polls and vote with
      <a href="https://en.wikipedia.org/wiki/Majority_judgment" target="_blank"
        >majority judgment</a
      >, a new ranking algorithm based on grades, proven to be more fair and
      superior to other voting methods!
    </div>

    <div>
      <button
        class="create-button"
        @click="$router.push({ name: 'createElection' })"
      >
        Create!
      </button>
    </div>

    <div class="enter-code-block">
      <label class="enter-code-label" for="code">Participate to a vote</label>
      <!--      <div>Please enter the 5 letters code</div>-->
      <input
        id="code"
        class="code-input"
        v-model="code"
        minlength="5"
        maxlength="5"
      />
      <div v-if="isNotFound" class="error-text">
        Nothing found for this code, please try again
      </div>
      <button class="participate-button" @click="searchCode">
        Participate!
      </button>
    </div>
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
  width: 80%;
  max-width: 50ch;
  padding-top: 3em;
  padding-bottom: 1em;
}

.create-button {
  margin-bottom: 3em;
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
  font-weight: normal;
}

.enter-code-block {
  margin: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background: var(--background-two);
  padding: 4em 16px;
}

.enter-code-label {
  padding: 8px;
  font-size: 24px;
}

.code-input {
  border: 1px solid #c4a374;
  border-radius: 4px;
  width: 6.6ch;
  font: 5ch consolas, monospace;
  letter-spacing: 0.1ch;
  text-transform: uppercase;
  margin: 8px 8px;
  padding: 8px;
}

.participate-button {
  width: 10em;
}

.error-text {
  /*color: var(--third);*/
  background-color: var(--third);
  opacity: 0.8;
  padding: 8px 16px;
  border-radius: 4px;
  color: var(--text-dark);
}
</style>
