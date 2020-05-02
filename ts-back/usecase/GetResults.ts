import { VoteRepo } from "./ports/VoteRepo";
import majorityJudgment from "majority-judgment";
import { ElectionRepo } from "./ports/ElectionRepo";
import { Ballot, CandidateGrade } from "../domain/Ballot";
import _ from "lodash";

export const getResults = async (
  electionId: string,
  voteRepo: VoteRepo,
  electionRepo: ElectionRepo
): Promise<void> => {
  const ballots: Ballot[] = await voteRepo.getVotes(electionId);
  const election = await electionRepo.getElection(electionId);
  const grades: CandidateGrade[] = _.flatten(ballots.map((b) => b.grades));

  const votesForCandidates = election.candidates.map((c) => {
    const votes = grades
      .filter((candidateGrade) => candidateGrade.candidateId === c.id)
      .map((candidateGrade) => parseInt(candidateGrade.grade.toString()));
    return {
      id: c.id,
      votes: votes,
    };
  });

  const result = majorityJudgment(votesForCandidates);

  return result.map((res) => {
    return {
      ...res,
      candidateName: election.candidates.find((c) => c.id === res.id).name,
    };
  });
};
