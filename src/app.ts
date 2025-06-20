import express from "express";
import bookRouter from "./app/controllers/book.controller";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Let's do the assignment 💪");
});

// Book Controller
app.use("/api/books", bookRouter);

export default app;
