export interface ElectionRepo {
  saveElection(): Promise<void>;
}
