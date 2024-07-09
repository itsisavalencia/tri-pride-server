import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import boardRoutes from "./routes/board.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());

app.use(express.json());

app.use("/public", express.static("./public"));

app.use("/board", boardRoutes);

app.listen(PORT, () => {
  console.log(`Welcome to: http://localhost:${PORT}`);
});
