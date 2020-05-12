<template>
  <div class="new-vote-form">
    <div class="new-vote-header cursive">New vote</div>
    <div class="title-form">
      <label for="new-election-name" class="title-label">Question</label>
      <input
        class="title-input"
        id="new-election-name"
        v-model="name"
        placeholder="Where should we go on vacation?"
      />
    </div>
    <EditCandidates :candidates="candidates" class="candidates-list" />
    <button
      class="save-button"
      v-on:click="create()"
      :disabled="isButtonDisabled()"
    >
      Save
    </button>
  </div>
</template>

<script>
import axios from "axios";
import config from "../config";
import EditCandidates from "@/components/EditCandidates";

export default {
  name: "AddElection",
  components: { EditCandidates },
  props: {},
  data() {
    return {
      name: "",
      description: "",
      candidates: [{ name: "" }]
    };
  },
  methods: {
    async create() {
      const election = {
        name: this.name,
        description: this.description,
        candidates: this.candidates
      };
      console.log("Saving... ", election.candidates[0].name);
      const result = await axios.post(config.rootApi + "/elections", election);
      console.log("got result of save", result);
      if (result.status === 201) {
        this.$router.push({
          name: "electionDetails",
          params: { id: result.data }
        });
      } else {
        console.error("Save failed!!", result);
      }
    },
    isButtonDisabled() {
      const realCandidateNumber = this.candidates.filter(c => c.name.length > 0)
        .length;
      return this.name.length < 1 || this.candidates.length === 0 || realCandidateNumber < 2;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.new-vote-form {
  display: flex;
  align-self: center;
  flex-direction: column;
  align-items: stretch;
  width: 40ch;
  max-width: 90vw;
  padding: 0 16px;
}

.new-vote-header {
  font-size: 32px;
  font-weight: 500;
  margin: 32px 0;
}

.title-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.title-label {
  font-size: 24px;
  margin-bottom: 16px;
}

.title-input {
  width: 100%;
  box-sizing: border-box;
}

.candidates-list {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.save-button {
  align-self: center;
  margin-top: 40px;
  width: 10em;
}
</style>
