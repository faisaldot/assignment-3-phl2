import { Schema, model, Document, Model } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  updateAvailability(): Promise<void>;
}

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
      required: true,
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: { type: Number, required: true, min: 0 },
    available: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

bookSchema.pre("save", function (next) {
  if (this.isModified("copies") && this.copies === 0) {
    this.available = false;
  } else if (this.isModified("copies") && this.copies > 0 && !this.available) {
    this.available = true;
  }
  next();
});

bookSchema.methods.updateAvailability = async function () {
  if (this.copies === 0) {
    this.available = false;
  } else {
    this.available = true;
  }
  await this.save();
};

export const Book = model<IBook>("Book", bookSchema);
