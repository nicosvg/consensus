export interface Candidate {
    id: string,
    name: string
}

export interface Election {
    id: string,
    title: string,
    candidates: Candidate[]
}
