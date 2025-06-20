import express from "express";
import { Book, IBook } from "../models/book.model";

const bookRouter = express.Router();

// Creating Book
bookRouter.post("/", async (req, res) => {
  try {
    const newBook = await Book.create(req.body);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: newBook,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: error.message,
    });
  }
});

export default bookRouter;
