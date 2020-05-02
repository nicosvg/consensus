interface CandidateGrade {
  candidateId: string;
  grade: number;
}

export interface Ballot {
  id: string;
  electionId: string;
  grades: CandidateGrade;
}
