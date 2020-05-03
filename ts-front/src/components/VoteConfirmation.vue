<template>
  <div>
    <h1>Vote sent!</h1>
    <button @click="seeResults()">See results</button>
  </div>
</template>

<script>
export default {
  name: "ElectionDetails",
  props: {
    id: String
  },
  methods: {
    seeResults() {
      this.$router.push({ name: "results", params: { id: this.id } });
    }
  }
};
</script>

<style scoped>
.candidates-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.candidate {
  padding: 16px;
  margin: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #7f9daa;
}

.vote-button {
  margin-top: 32px;
}

.grade {
  margin-top: 8px;
  padding: 8px 8px;
  cursor: pointer;
  width: 10rem;
}

.selected {
  border: 2px solid #404040;
  border-radius: 3px;
  margin-top: 6px;
}
</style>
