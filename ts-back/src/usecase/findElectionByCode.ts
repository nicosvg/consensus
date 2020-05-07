import { Election } from "../domain/Election";
import { ElectionRepo } from "./ports/ElectionRepo";

export const findElectionByCode = async (
  code: string,
  electionRepo: ElectionRepo
): Promise<Election> => {
  return electionRepo.findByCode(code);
};
