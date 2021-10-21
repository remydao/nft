import express from "express";
import { addToTeam } from "../controllers/team-controller";

const router = express.Router();

// Add a task to the database
router.put('/addToTeam', addToTeam);

module.exports = router;