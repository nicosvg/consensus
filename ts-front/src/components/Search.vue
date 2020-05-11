<template>
  <div class="search-component">
    <label class="enter-code-label" for="code">Participate with a code</label>
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
</template>

<script>
import { searchElectionByCode } from "@/service";

export default {
  name: "Search",
  data() {
    return {
      code: "",
      isNotFound: false
    };
  },
  methods: {
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

<style scoped>
.search-component {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 4em 16px;
  box-sizing: border-box;
}

.enter-code-label {
  padding: 8px;
  font-size: 24px;
}

.code-input {
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
  background-color: var(--accent);
  opacity: 0.8;
  padding: 8px 16px;
  border-radius: 4px;
  color: var(--text-dark);
}
</style>
