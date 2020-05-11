<template>
  <div>
    <h2>Create a new election or poll</h2>
    <div class="title-form">
      <label for="new-election-name" class="title-label">Title/question</label>
      <input
        class="title-input"
        id="new-election-name"
        v-model="name"
        placeholder="title"
      />
    </div>
    <EditCandidates :candidates="candidates" class="candidates-list" />
    <button class="save-button" v-on:click="create()">Save</button>
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title-form > label {
  margin-bottom: 8px;
}

.title-label {
  font-size: 24px;
  margin-bottom: 8px;
}

.candidates-list {
  margin-top: 16px;
}

.save-button {
  margin-top: 32px;
}
</style>
