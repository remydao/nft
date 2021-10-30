import express from "express";
import { createTeam } from "../controllers/team-controller";
import { checkTokenMiddleware } from "../services/authorization";

const router = express.Router();


/**
 * @swagger
 * /team:
 *   post:
 *     summary: Add a Team
 *     description: Adds a new Team with 1000 credits
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           required:
 *             - name
 *           properties:
 *             name:
 *               type: string
 *           example:
 *             name: GaziTeam
 *     responses:
 *       200:
 *         description: OK
 *       400: 
 *         description: Incorrect body
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *     tags:
 *       - 4/ Team Management
 */
router.post('/team', checkTokenMiddleware, createTeam);

module.exports = router;