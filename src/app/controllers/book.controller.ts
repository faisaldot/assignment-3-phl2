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

// Get All Books
bookRouter.get("/", async (req, res) => {
  try {
    const {
      filter,
      sortBy = "createdAt",
      sort = "desc",
      limit = "10",
    }: {
      filter?: string;
      sortBy?: string;
      sort?: "desc" | "asc";
      limit?: string;
    } = req.query;

    const filterQuery: Record<string, any> = {};

    if (filter) {
      filterQuery.genre = filter.toUpperCase();
    }

    const books = await Book.find(filterQuery)
      .sort({ [sortBy]: sort === "asc" ? 1 : -1 })
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Failed to retrieving books",
      success: false,
      error: error.message,
    });
  }
});

// Get Book by ID
bookRouter.get("/:bookId", async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);

    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Failed to retrieving books",
      success: false,
      error: error.message,
    });
  }
});
export default bookRouter;
