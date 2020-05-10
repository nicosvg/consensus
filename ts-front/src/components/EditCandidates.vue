<template>
  <div>
    <div class="title">Candidates list</div>
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
          placeholder="name"
          v-on:keyup.enter="addCandidate()"
          :ref="'candidate-input-' + index"
        />
        <button class="remove-button" @click="removeCandidate(index)">x</button>
      </div>
    </div>
    <button v-on:click="addCandidate()" class="add-candidate-button">
      Add a candidate
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
    }
  }
};
</script>

<style scoped>
.title {
  font-size: 24px;
  margin-bottom: 8px;
}

.list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.candidate-row {
  display: flex;
  align-items: center;
  margin-top: 16px;
}

.candidate-input {
}

.remove-button {
  width: 32px;
  height: 32px;
  padding: 0;
  margin: 0 0 0 8px;
}

.add-candidate-button {
  margin-top: 16px;
}
</style>
