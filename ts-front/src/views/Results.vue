<template>
  <div>
    <h1>Results</h1>
    <div class="winner">
      Winner
      <div class="winner-name">
        {{ results[0].candidateName }}
      </div>
    </div>
    <div class="candidates-list">
      <div v-for="result in results" :key="result.id">
        {{ result.candidateName }} - Grade: {{ result.note }}
      </div>
    </div>
  </div>
</template>

<script>
import { fetchResults } from "../service";

export default {
  name: "ElectionDetails",
  props: {
    id: String
  },
  data() {
    return {
      results: {}
    };
  },
  async created() {
    this.results = await fetchResults(this.id);
  }
};
</script>

<style scoped>
.winner {
  margin: 16px;
  padding: 16px;
  background-color: var(--light);
}

.winner-name {
  padding: 16px;
  font-size: 2rem;
}
</style>
