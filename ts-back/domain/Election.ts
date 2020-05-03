export interface Candidate {
    id: string,
    name: string
}

export interface Election {
    id: string,
    name: string,
    candidates: Candidate[]
}
