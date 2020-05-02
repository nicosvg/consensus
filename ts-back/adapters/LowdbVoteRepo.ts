import { VoteRepo } from "../usecase/ports/VoteRepo";
import { Ballot } from "../domain/Ballot";

const dbName: string = "votes";
export class LowdbVoteRepo implements VoteRepo {
  private readonly db: any;
  constructor(db: any) {
    this.db = db;
  }

  getVotes(electionId: string): Promise<Ballot[]> {
    return this.db.get(dbName).filter({ electionId: electionId }).value();
  }

  async saveVote(ballot: Ballot): Promise<void> {
    await this.db.get(dbName).push(ballot).write();
    console.log(this.getVotes(ballot.electionId));
  }
}
