import { Election } from "../domain/Election";
import { ElectionRepo } from "./ports/ElectionRepo";

export const getElection = async (
  electionId: string,
  electionRepo: ElectionRepo
): Promise<Election> => {
  return electionRepo.getElection(electionId);
};
