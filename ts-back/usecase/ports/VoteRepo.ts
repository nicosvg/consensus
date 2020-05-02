import {Ballot} from "../../domain/Ballot";

export interface VoteRepo {
    saveVote(ballot: Ballot): Promise<void>;
    getVotes(electionId: string): Promise<Ballot[]>;
}
