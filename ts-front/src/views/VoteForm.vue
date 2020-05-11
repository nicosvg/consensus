<template>
  <div>
    <h1>{{ election.name }}</h1>
    <h3>Candidates</h3>
    <div class="candidates-list">
      <div
        v-for="candidate in election.candidates"
        :key="candidate.id"
        class="candidate"
      >
        <div class="candidate-name">{{ candidate.name }}</div>
        <div
          v-for="grade in gradeValues"
          class="grade"
          :key="grade.value"
          :style="{ backgroundColor: grade.color }"
          :class="{ selected: selection[candidate.id] === grade.value }"
          @click="select(candidate.id, grade.value)"
        >
          {{ grade.label }}
        </div>
      </div>
    </div>
    <button class="vote-button" @click="vote(election.id)">Validate</button>
  </div>
</template>

<script>
import axios from "axios";
import config from "../config";
import { sendVote } from "@/service";

export default {
  name: "ElectionDetails",
  props: {
    id: String
  },
  data() {
    return {
      election: {},
      selection: {},
      gradeValues: [
        { color: "#008255", label: "excellent", value: 5 },
        { color: "#79B540", label: "very good", value: 4 },
        { color: "#D0D826", label: "good", value: 3 },
        { color: "#f8bb32", label: "acceptable", value: 2 },
        { color: "#cc5e5c", label: "poor", value: 1 },
        { color: "#B91D2D", label: "to reject", value: 0 }
      ]
    };
  },
  async created() {
    const response = await axios.get(config.rootApi + "/elections/" + this.id);
    console.log("response details", response);
    this.election = response.data;
  },
  methods: {
    async vote() {
      const grades = Object.keys(this.selection).map(key => {
        return { candidateId: key, grade: this.selection[key] };
      });
      const ballot = { electionId: this.election.id, grades: grades };
      console.log("vote", ballot);
      await sendVote(this.election.id, ballot);
      this.$router.push({ name: "results", params: { id: this.election.id } });
    },
    select(candidateId, grade) {
      console.log(`Selected ${grade} for candidate ${candidateId}`);
      this.selection[candidateId] = grade;
      this.selection = { ...this.selection };
      console.log("selection", this.selection);
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
