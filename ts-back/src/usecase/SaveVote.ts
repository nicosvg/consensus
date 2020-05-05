import {Ballot} from "../domain/Ballot";
import {VoteRepo} from "./ports/VoteRepo";
import {v4 as uuid} from "uuid";

export const saveVote = async (
  electionId: string,
  ballot: Ballot,
  voteRepo: VoteRepo
): Promise<void> => {
  if (!ballot.id) {
    ballot.id = uuid()
  }
  if (!ballot.electionId) {
    ballot.electionId = electionId;
  }
  return voteRepo.saveVote(ballot);
};
