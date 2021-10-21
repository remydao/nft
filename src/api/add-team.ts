import express from "express";
import { addTeam } from "../controllers/team-controller";
import { checkTokenMiddleware } from "../services/authorization";

const router = express.Router();

router.post('/team', checkTokenMiddleware, addTeam);

module.exports = router;