import express from "express";
import { addToTeam } from "../controllers/team-controller";
import { checkTokenMiddleware } from "../services/authorization";

const router = express.Router();

router.post('/addToTeam', checkTokenMiddleware, addToTeam);

module.exports = router;