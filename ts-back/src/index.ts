import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";

import { Election } from "./domain/Election";
import { createElection } from "./usecase/CreateElection";
import { listElections } from "./usecase/ListElections";
import lowdb from "lowdb";
import { LowdbElectionRepo } from "./adapters/LowdbElectionRepo";
import { Ballot } from "./domain/Ballot";
import { saveVote } from "./usecase/SaveVote";
import { LowdbVoteRepo } from "./adapters/LowdbVoteRepo";
import { getResults } from "./usecase/GetResults";
import { getElection } from "./usecase/getElection";
import { findElectionByCode } from "./usecase/findElectionByCode";

const app = express();

app.use(morgan("tiny"));

app.use(bodyParser.json());
app.use(cors());

app.get("/health", (req, res: express.Response) => {
  res.status(200).send("UP");
});

app.listen(process.env.PORT || 8000, () => {
  console.log("Consensus server listening on port " + process.env.PORT || 8000);

  process.on("SIGABRT", cleanTerminate);
  process.on("SIGINT", cleanTerminate);
  process.on("SIGBREAK", cleanTerminate);
});

// DB init
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync(process.env.DB_PATH || "db.json");
const db = lowdb(adapter);
initDb(db);

// Init repos
const electionRepo = new LowdbElectionRepo(db);
const voteRepo = new LowdbVoteRepo(db);

// Routes
createRoutes();

function initDb(db) {
  db.defaults({ elections: [], votes: [] }).write();
}

function cleanTerminate(signal: NodeJS.Signals): void {
  console.log("cleaning before terminating process ...", { signal: signal });
  process.exit(0);
}

function createRoutes() {
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
  app.use("/api/v1", router);
}
