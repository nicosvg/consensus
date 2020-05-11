import { Election } from "../../domain/Election";

export interface ElectionRepo {
  saveElection(election: Election): Promise<string>;
  listElections(): Promise<Election[]>;
  getElection(electionId: string): Promise<Election>;
  findByCode(code: string): Promise<Election | null>;
}
