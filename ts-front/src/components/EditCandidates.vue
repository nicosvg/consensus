<template>
  <div class="candidate-list-container">
    <div class="title">Proposals</div>
    <div class="list">
      <div
        class="candidate-row"
        v-for="(candidate, index) in candidates"
        :key="'candidate' + index"
      >
        <label for="candidate-name"></label>
        <input
          class="candidate-input"
          id="candidate-name"
          v-model="candidate.name"
          :placeholder="getRandomPlaceholder()"
          v-on:keyup.enter="addCandidate()"
          :ref="'candidate-input-' + index"
        />
        <button class="remove-button" @click="removeCandidate(index)">x</button>
      </div>
    </div>
    <button v-on:click="addCandidate()" class="add-candidate-button">
      +
    </button>
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

      this.$nextTick(() => {
        const ref = "candidate-input-" + (this.candidates.length - 1);
        this.$refs[ref][0].focus();
      });
    },
    removeCandidate(index) {
      this.candidates = this.candidates.splice(index, 1);
    },
    getRandomPlaceholder() {
      const strings = [
        "In the kitchen",
        "In the bathroom",
        "On the moon",
        "Somewhere sunny",
        "Somewhere funny",
        "Somewhere with snow",
        "Under the sea",
        "On an island"
      ];
      return strings[Math.floor(Math.random() * strings.length)];
    }
  }
};
</script>

<style scoped>
.candidate-list-container {
  display: flex;
  align-items: stretch;
}

.title {
  font-size: 24px;
  margin-bottom: 16px;
  align-self: flex-start;
}

.list {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.candidate-row {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.candidate-input {
  width: 100%;
}

.remove-button {
  width: 32px;
  height: 32px;
  padding: 0;
  margin: 0 0 0 8px;
}

.add-candidate-button {
  margin: 0 0;
  height: 32px;
  background-color: var(--secondary);
  padding: 0;
  font-size: 22px;
  font-weight: 500;
}
.add-candidate-button:hover {
  background-color: var(--primary);
  color: var(--text-light);
}
</style>
