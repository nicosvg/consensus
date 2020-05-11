<template>
  <div class="home">
    <div class="home-title">Consensus</div>
    <ThumbsIcon class="thumbs"></ThumbsIcon>
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

    <Search class="enter-code-block"></Search>
  </div>
</template>

<script>
import { searchElectionByCode } from "@/service";
import Search from "@/components/Search";
import ThumbsIcon from "@/assets/ThumbsIcon";

export default {
  name: "Home",
  components: { ThumbsIcon, Search },
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
  font-family: "Delius Swash Caps", cursive;
  color: var(--primary);
  font-size: 3.5em;
  margin-top: 32px;
}

.home-subtitle {
  color: var(--text-dark);
  font-size: 1em;
  width: 80%;
  max-width: 50ch;
  padding-top: 3em;
  padding-bottom: 1em;
}

.create-button {
  margin-bottom: 3em;
}

.enter-code-block {
  background: var(--background-two);
}

.thumbs {
  height: 6em;
  margin-top: 32px;
}
</style>
