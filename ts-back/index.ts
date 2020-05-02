import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import serveStatic from "serve-static";
import { Election } from "./domain/Election";

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

// Routes
app.get("/elections", (req, res) => {
  console.log("list elections");
});
app.get("/elections/:id", (req, res) => {
  console.log("list one election");
});
app.post("/elections", (req: express.Request, res: express.Response) => {
  console.log("create one election");
  const election: Election = req.body;
});
