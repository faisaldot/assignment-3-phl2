import "dotenv/config";
import mongoose from "mongoose";
import app from "./app";

const PORT = process.env.PORT || 9001;
const MONGO_URI = process.env.MONGO_URI!;

main().catch((e) => console.error(e));

async function main() {
  mongoose.connect(MONGO_URI);
  console.log(`Database connected successfully!`);

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}
