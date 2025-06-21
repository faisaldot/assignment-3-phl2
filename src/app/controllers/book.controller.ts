import express, { Request, Response } from "express";
import { Book } from "../models/book.model";
import mongoose from "mongoose";

const bookRouter = express.Router();

// Creating Book
bookRouter.post("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const newBook = await Book.create(req.body);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: newBook,
    });
  } catch (error: any) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        message: "Validation failed",
        success: false,
        error: {
          name: error.name,
          errors: error.errors,
        },
      });
    }
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: error.message,
    });
  }
});

// Get All Books
bookRouter.get("/", async (req: Request, res: Response): Promise<any> => {
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
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        message: "Validation failed",
        success: false,
        error: {
          name: error.name,
          errors: error.errors,
        },
      });
    }
    res.status(400).json({
      message: "Failed to retrieving books",
      success: false,
      error: error.message,
    });
  }
});

// Get Book by ID
bookRouter.get(
  "/:bookId",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const book = await Book.findById(req.params.bookId);

      res.status(200).json({
        success: true,
        message: "Book retrieved successfully",
        data: book,
      });
    } catch (error: any) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({
          message: "Validation failed",
          success: false,
          error: {
            name: error.name,
            errors: error.errors,
          },
        });
      }
      res.status(400).json({
        message: "Failed to retrieving books",
        success: false,
        error: error.message,
      });
    }
  }
);

// Update book
bookRouter.patch(
  "/:bookId",
  async ({ body, params }: Request, res: Response): Promise<any> => {
    try {
      const updatedBook = await Book.findByIdAndUpdate(params.bookId, body, {
        new: true,
      });
      res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: updatedBook,
      });
    } catch (error: any) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({
          message: "Validation failed",
          success: false,
          error: {
            name: error.name,
            errors: error.errors,
          },
        });
      }
      res.status(400).json({
        message: "Failed to update the book details",
        success: false,
        error: error.message,
      });
    }
  }
);

// Delete book
bookRouter.delete(
  "/:bookId",
  async ({ params }: Request, res: Response): Promise<any> => {
    try {
      const deletedBook = await Book.findByIdAndDelete(params.bookId);
      res.status(200).json({
        success: true,
        message: "Book deleted successfully",
        data: deletedBook && null,
      });
    } catch (error: any) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({
          message: "Validation failed",
          success: false,
          error: {
            name: error.name,
            errors: error.errors,
          },
        });
      }
      res.status(400).json({
        message: "Failed to delete the book",
        success: false,
        error: error.message,
      });
    }
  }
);

export default bookRouter;
