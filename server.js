import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import boardRoutes from "./routes/board.js";
import eventsRoutes from "./routes/events.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());

app.use(express.json());

app.use(express.static("static"));

app.use("/board", boardRoutes);

app.use("/events", eventsRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Welcome to: http://0.0.0.0:${PORT}`);
});
