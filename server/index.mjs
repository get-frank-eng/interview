import { makeDatabase } from "./utils.mjs";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
const database = makeDatabase();

app.get("/posts", (req, res) => {
  if (process.env.FLAKY) {
    if (Math.random() > 0.85) {
      return res.status(500).json({
        message: "Internal server error... sorry!",
      });
    }
  }
  const { page } = req.query;
  const perPage = 20;
  const beginning = page * perPage;
  const slice = database.slice(beginning, beginning + perPage);
  res.json({
    hasNext: beginning + perPage < database.length,
    posts: slice,
  });
});

app.listen(4000, () => console.log("🔌 🎤 We are live on 4000."));
