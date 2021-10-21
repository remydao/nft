import express from "express";
import { changeBalance } from "../controllers/change-team-balance-controller";

const router = express.Router();

// Add a task to the database
router.put('/team/{team_id}/balance/{money_add}', changeBalance);

module.exports = router;