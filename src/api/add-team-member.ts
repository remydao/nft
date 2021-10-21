import express from "express";
import { addTeamMember } from "../controllers/add-team-member-controller";

const router = express.Router();

// Add a task to the database
router.post('/team/member', addTeamMember);

module.exports = router;