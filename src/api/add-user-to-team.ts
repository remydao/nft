import express from "express";
import { addToTeam } from "../controllers/team-controller";
import { checkTokenMiddleware } from "../services/authorization";

const router = express.Router();

router.put('/addToTeam', checkTokenMiddleware, addToTeam);

module.exports = router;