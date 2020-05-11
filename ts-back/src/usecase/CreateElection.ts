import { Election } from "../domain/Election";
import { ElectionRepo } from "./ports/ElectionRepo";
import { v4 as uuid } from "uuid";

export const createElection = async (
  election: Election,
  electionRepo: ElectionRepo
): Promise<string> => {
  if (election.id == null) {
    election.id = uuid();
  }
  for (const candidate of election.candidates) {
    if (candidate.id == null) {
      candidate.id = uuid();
    }
  }

  election.code = getCode();

  return electionRepo.saveElection(election);
};

function getCode() {
  let result           = '';
  const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const charactersLength = characters.length;
  for ( let i = 0; i < 5; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

