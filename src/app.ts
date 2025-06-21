import express from "express";
import bookRouter from "./app/controllers/book.controller";
import borrowRouter from "./app/controllers/borrow.controller";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Let's do the assignment 💪");
});

// Book Controller
app.use("/api/books", bookRouter);

// Borrow Controller
app.use("/api/borrow", borrowRouter);
export default app;
