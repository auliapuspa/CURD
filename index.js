import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

// middleware
app.use(express.json());

// database
connectDB();

// routes
app.use("/", routes);

// global error handler (HARUS PALING BAWAH)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);