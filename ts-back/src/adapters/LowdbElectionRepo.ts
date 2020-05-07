import { ElectionRepo } from "../usecase/ports/ElectionRepo";
import { Election } from "../domain/Election";

const dbName: string = "elections";
export class LowdbElectionRepo implements ElectionRepo {
  private readonly db: any;
  constructor(db: any) {
    this.db = db;
  }

  saveElection(election): Promise<void> {
    return this.db
      .get(dbName)
      .push(election)
      .write();
  }

  listElections(): Promise<Election[]> {
    return this.db.get(dbName).value();
  }

  getElection(electionId: string): Promise<Election> {
    return this.db
      .get(dbName)
      .find({ id: electionId })
      .value();
  }

  findByCode(code: string): Promise<Election | null> {
    const result = this.db
      .get(dbName)
      .find({ code: code })
      .value();
    if (!result) {
      return null;
    }
    return result;
  }
}
