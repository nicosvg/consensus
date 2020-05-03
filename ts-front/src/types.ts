export interface Candidate {
    id?: string,
    name: string
}

export interface Election {
    id?: string,
    name: string,
    candidates: Candidate[]
}

export interface CandidateGrade {
    candidateId: string;
    grade: number;
}

export interface Ballot {
    id?: string;
    electionId: string;
    grades: CandidateGrade[];
}
