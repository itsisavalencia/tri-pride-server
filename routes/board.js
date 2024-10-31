import express from "express";
import fs from "fs";
import path from "path"; // Import path module

const router = express.Router();

const readBoard = () => {
  // Use path.join to construct the path to board.json
  const boardFilePath = path.join(process.cwd(), "data", "board.json"); // Updated line
  const boardFile = fs.readFileSync(boardFilePath); // Updated line
  const board = JSON.parse(boardFile);
  return board;
};

router.get("/", (_req, res) => {
  try {
    const board = readBoard();
    res.json(board);
  } catch (error) {
    console.error(`Error reading file: ${error}`);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:boardMemberId", (req, res) => {
  try {
    const board = readBoard();
    const boardMemberId = req.params.boardMemberId;
    const boardMember = board.find(
      (boardMember) => boardMember.id == boardMemberId
    );

    if (!boardMember) {
      console.log(`boardMember not found for ID: ${boardMemberId}`);
      return res.status(404).send("boardMember not found"); // Return here to avoid sending two responses
    }
    res.json(boardMember);
  } catch (error) {
    console.error(
      `Error processing request for single boardMember: ${boardMemberId}`
    );
    res.status(500).send("Internal Server Error");
  }
});

export default router;
