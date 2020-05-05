import { Election } from "../domain/Election";
import { ElectionRepo } from "./ports/ElectionRepo";

export const listElections = async (
  electionRepo: ElectionRepo
): Promise<Election[]> => {
  return electionRepo.listElections();
};

