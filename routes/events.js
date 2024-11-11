import express from "express";
import fs from "fs";
import path from "path"; // Import path module

const router = express.Router();

const readEvents = () => {
  // Use path.join to construct the path to events.json
  const eventsFilePath = path.join(process.cwd(), "data", "events.json"); // Updated line to use process.cwd()
  const eventsFile = fs.readFileSync(eventsFilePath, "utf-8"); // Read file as UTF-8
  const events = JSON.parse(eventsFile);
  return events;
};

router.get("/", (_req, res) => {
  try {
    const events = readEvents();
    res.json(events);
  } catch (error) {
    console.error(`Error reading file: ${error}`);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:eventId", (req, res) => {
  try {
    const events = readEvents();
    const eventId = req.params.eventId;
    const event = events.find((event) => event.id == eventId);

    if (!event) {
      console.log(`Event not found for ID: ${eventId}`);
      return res.status(404).send("Event not found");
    }
    res.json(event);
  } catch (error) {
    console.error(`Error processing request for single event: ${eventId}`);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
