import express from "express";
import { Election } from "./domain/Election";
import { createElection } from "./usecase/CreateElection";
import { listElections } from "./usecase/ListElections";
import { Ballot } from "./domain/Ballot";
import { saveVote } from "./usecase/SaveVote";
import { getResults } from "./usecase/GetResults";
import { getElection } from "./usecase/getElection";
import { findElectionByCode } from "./usecase/findElectionByCode";
import { ElectionRepo } from "./usecase/ports/ElectionRepo";
import { VoteRepo } from "./usecase/ports/VoteRepo";

export function createRoutes(electionRepo: ElectionRepo, voteRepo: VoteRepo) {
    const router = express.Router();
    router.get("/elections", async (req, res: express.Response) => {
        const code: string = req.query.code as string;
        console.log("code", code);
        if (code) {
            const election: Election | null = await findElectionByCode(
                code,
                electionRepo
            );
            if (election === null) {
                return res.status(404).send("Not found!");
            } else {
                return res.status(200).send(election);
            }
        }
        const elections: Election[] = await listElections(electionRepo);
        return res.send(elections);
    });
    router.get("/elections/:id", async (req, res) => {
        const election: Election = await getElection(req.params.id, electionRepo);
        return res.send(election);
    });
    router.post(
        "/elections/:id/vote",
        async (req: express.Request, res: express.Response) => {
            const electionId: string = req.params.id;
            const vote: Ballot = req.body;
            await saveVote(electionId, vote, voteRepo);
            return res.status(200).send("Ballot saved successfully");
        }
    );
    router.get(
        "/elections/:id/results",
        async (req: express.Request, res: express.Response) => {
            const electionId = req.params.id;
            const result = await getResults(electionId, voteRepo, electionRepo);
            return res.send(result);
        }
    );
    router.post(
        "/elections",
        async (req: express.Request, res: express.Response) => {
            const election: Election = req.body;
            const createdId = await createElection(election, electionRepo);
            return res.status(201).send(createdId);
        }
    );
    return router
}
