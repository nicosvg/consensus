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
import { createRoutes } from "./router";

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
const router = createRoutes(electionRepo, voteRepo);
app.use("/api/v1", router);

function initDb(db) {
  db.defaults({ elections: [], votes: [] }).write();
}

function cleanTerminate(signal: NodeJS.Signals): void {
  console.log("cleaning before terminating process ...", { signal: signal });
  process.exit(0);
}
