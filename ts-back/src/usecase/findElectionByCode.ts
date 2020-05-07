import { Election } from "../domain/Election";
import { ElectionRepo } from "./ports/ElectionRepo";

export const findElectionByCode = async (
  code: string,
  electionRepo: ElectionRepo
): Promise<Election | null> => {
  if (!code) {
    return null;
  }
  return electionRepo.findByCode(code.toUpperCase());
};
