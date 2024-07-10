import express from "express";
import fs from "fs";

const router = express.Router();

const readEvents = () => {
  const eventsFile = fs.readFileSync("./data/events.json");
  const events = JSON.parse(eventsFile);
  return events;
};
router.get("/", (_req, res) => {
    try {
      const events = readEvents();
      res.json(events);
    } catch (error) {
      console.error(`Error reading file: ${error}`);
      res.status(500).send("internal server error");
    }
  });
  
  router.get("/:eventId", (req, res) => {
    try {
      const events = readEvents();
      const eventId = req.params.eventId;
      const event = events.find((event) => event.id == eventId);
  
      if (!event) {
        console.log(`event not found for ID: ${eventId}`);
        res.status(404).send("event not found");
      }
      res.json(event);
    } catch (error) {
      console.error(`error processing request for single event: ${eventId}`);
      res.status(500).send("internal server error");
    }
  });

  export default router;
