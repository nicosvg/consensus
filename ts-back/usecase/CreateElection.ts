import { Election } from "../domain/Election";
import { ElectionRepo } from "./ports/ElectionRepo";
import { v4 as uuid } from "uuid";

export const createElection = async (
  election: Election,
  electionRepo: ElectionRepo
): Promise<void> => {
  if (election.id == null) {
    election.id = uuid();
  }
  for (const candidate of election.candidates) {
    if (candidate.id == null) {
      candidate.id = uuid();
    }
  }
  return electionRepo.saveElection(election);
};
