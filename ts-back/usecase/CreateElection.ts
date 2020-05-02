import { Election } from "../domain/Election";
import { ElectionRepo } from "./ports/ElectionRepo";

const createElection = async (
  election: Election,
  electionRepo: ElectionRepo
): Promise<void> => {
  return electionRepo.saveElection();
};
