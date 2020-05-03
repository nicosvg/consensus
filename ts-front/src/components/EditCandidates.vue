<template>
  <div>
    <h3>Candidates list</h3>
    <div v-for="(candidate, index) in candidates" :key="'candidate' + index">
      <label for="candidate-name"></label>
      <input id="candidate-name" v-model="candidate.name" placeholder="name" />
    </div>
    <button v-on:click="addCandidate()">Add a candidate</button>
  </div>
</template>

<script>
export default {
  name: "EditCandidates",
  props: {
    candidates: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    addCandidate() {
      this.candidates.push({ name: "" });
    }
  }
};
</script>
