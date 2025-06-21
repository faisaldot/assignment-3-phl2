import express from "express";
import mongoose from "mongoose";
import { Borrow, IBorrow } from "../models/borrow.model";
import { Book } from "../models/book.model";

const borrowRouter = express.Router();

borrowRouter.post("/", async (req, res) => {
  try {
    const { book: bookId, quantity, dueDate }: IBorrow = req.body;
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        message: "Book not found",
        success: false,
        error: "Book with the provided ID does not exits",
      });
    }

    if (book.copies < quantity) {
      return res.status(400).json({
        message: "Not enough copies available",
        success: false,
        error: `Only ${book.copies} copies of ${book.title} are available.`,
      });
    }

    book.copies -= quantity;

    await book.updateAvailability();

    const newBorrow = await Borrow.create({
      book: bookId,
      quantity,
      dueDate,
    });

    res.status(201).json({
      success: true,
      message: "book borrowed successfully",
      data: newBorrow,
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
      message: "Failed to borrow book",
      success: false,
      error: error.message,
    });
  }
});

export default borrowRouter;
