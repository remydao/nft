import express from "express";
import { getBestSellerTeams } from "../controllers/best-seller-teams-controller";

const router = express.Router();

// Add a task to the database
router.get('/teams/bestsellers', getBestSellerTeams);

module.exports = router;