import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import serveStatic from "serve-static";
import { Election } from "./domain/Election";

import { createElection } from "./usecase/CreateElection";
import { listElections } from "./usecase/ListElections";
import lowdb from "lowdb";
import { LowdbElectionRepo } from "./adapters/LowdbElectionRepo";
import { Ballot } from "./domain/Ballot";
import { saveVote } from "./usecase/SaveVote";
import { LowdbVoteRepo } from "./adapters/LowdbVoteRepo";

const app = express();

// Serve front files
const frontDir = process.env.FRONT_DIR
  ? process.env.FRONT_DIR
  : "../front/dist";
app.use(serveStatic(frontDir));

app.use(bodyParser.json());
app.use(cors());

app.get("/health", (req, res: express.Response) => {
  res.status(200).send("UP");
});

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});

// DB init
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = lowdb(adapter);
initDb(db);

// Init repos
const lowdbElectionRepo = new LowdbElectionRepo(db);
const voteRepo = new LowdbVoteRepo(db);

// Routes
app.get("/elections", async (req, res: express.Response) => {
  const elections: Election[] = await listElections(lowdbElectionRepo);
  return res.send(elections);
});
app.get("/elections/:id", (req, res) => {
  console.log("list one election");
});
app.post("/elections", async (req: express.Request, res: express.Response) => {
  const election: Election = req.body;
  await createElection(election, lowdbElectionRepo);
  return res.status(200).send("Election created successfully");
});
app.post(
  "/elections/:id/vote",
  async (req: express.Request, res: express.Response) => {
    const electionId: string = req.params.id;
    const vote: Ballot = req.body;
    await saveVote(electionId, vote, voteRepo);
    return res.status(200).send("Ballot saved successfully");
  }
);
function initDb(db) {
  db.defaults({ elections: [], votes: [] }).write();
}
