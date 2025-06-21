# 📚 Library Management API

This is a simple Library Management API build with <b>Express.js</b>, <b>TypeScript</b> and <b>MongoDB</b> (<b>Mongoose</b>).

## ⚡ Features

### Book Management:

- Create new books with detailed information (title, author, genre, isbn, copies, availability).
- Retrieve all books with filtering (by genre), sorting (by `createdAt`, `title` and `limit`).
- Fetch a single book by its unique ID.
- Update existing book details.
- Delete books

### Borrowed Book System:

- Borrow books for available copies.
- Auto update of book `available` status when `copies` reach zero.

## 🚀 Technology User

- Node.js
- Express.js
- TypeScript
- MongoDb
- Mongoose
- dotenv

## 🛠️ Setup and Installation

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- Node.js 20 or higher
- Mongodb Atlas URI.

### Steps

1.  Clone the repository:

```bash
 git clone  https://github.com/faisaldot/assignment-3-phl2.git
 cd assignment-3-phl2
```

2. Install dependencies:

```bash
  pnpm install
```

3. Add your own environment variable in .env

and finally build the project using `pnpm run build` and run the project `pnpm run start` or use the dev server `pnpm run dev`

## 📚 API Endpoints

The API base URL is `/api`.

### 1. Create Book

- Endpoint: `POST /api/books`
- Description: Create a new book record.

### 2. Get All Book

- Endpoint: `GET /api/books`
- Description: Retrieves a lists of all books with optional filtering and sorting.
- Optional Query Parameters:
  - `filter`: filter by genre
  - `sortBy`: sortBy by `createdAt`
  - `sort`: sort by `asc` or `desc` order
  - `limit`: Return data with limits.

### 3. Get Book by ID

- Endpoint: `GET /api/books/:bookId`
- Description: Retrieves book by its ID.

### 4. Updated Book by ID

- Endpoint: `PATCH /api/books/:bookId`
- Description: Updated book details by its ID.

### 5. Delete Book by ID

- Endpoint: `DELETE /api/books/:bookId`
- Description: Delete book.

### 6. Borrow a Book

- Endpoint: `POST /api/borrow`
- Description: Records of borrowing books.

### 6. Borrow a Books Summary

- Endpoint: `GET /api/borrow`
- Description: Provides an aggregated summary of all borrowed books.

## 🔗 Live Deployment

## Video Explanation Link
