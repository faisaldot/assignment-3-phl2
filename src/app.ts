import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Let's do the assignment 💪");
});

export default app;
