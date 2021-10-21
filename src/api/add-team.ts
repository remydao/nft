import express from "express";
import { addTeam } from "../controllers/add-team-controller";

const router = express.Router();

// Add a task to the database
router.post('/team', addTeam);

module.exports = router;