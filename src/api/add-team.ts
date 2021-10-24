import express from "express";
import { createTeam } from "../controllers/team-controller";
import { checkTokenMiddleware } from "../services/authorization";

const router = express.Router();

router.post('/team', checkTokenMiddleware, createTeam);

module.exports = router;