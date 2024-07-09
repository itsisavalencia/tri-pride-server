import express from "express";
import fs from "fs";

const router = express.Router();

const readBoard = () => {
  const boardFile = fs.readFileSync("./data/board.json");
  const board = JSON.parse(boardFile);
  return board;
};
router.get("/", (_req, res) => {
    try {
      const board = readBoard();
      res.json(board);
    } catch (error) {
      console.error(`Error reading file: ${error}`);
      res.status(500).send("internal server error");
    }
  });
  
  router.get("/:boardMemberId", (req, res) => {
    try {
      const board = readBoard();
      const boardMemberId = req.params.boardMemberId;
      const boardMember = board.find((boardMember) => boardMember.id == boardMemberId);
  
      if (!boardMember) {
        console.log(`boardMember not found for ID: ${boardMemberId}`);
        res.status(404).send("boardMember not found");
      }
      res.json(boardMember);
    } catch (error) {
      console.error(`error processing request for single boardMember: ${boardMemberId}`);
      res.status(500).send("internal server error");
    }
  });

  export default router;
