import express from "express";
import { getBestSellerTeams } from "../controllers/best-seller-teams-controller";

const router = express.Router();

// Add a task to the database
router.post('/best-seller-teams', getBestSellerTeams);

module.exports = router;