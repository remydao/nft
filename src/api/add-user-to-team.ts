import express from "express";
import { addToTeam } from "../controllers/team-controller";
import { checkTokenMiddleware } from "../services/authorization";

const router = express.Router();

/**
 * @swagger
 * /add-to-team:
 *   post:
 *     summary: Add User to your Team
 *     description: Adds User to your Team
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           required:
 *             - userId
 *           properties:
 *             userId:
 *               type: integer
 *           example:
 *             userId: 1
 *     responses:
 *       200:
 *         description: OK
 *       400: 
 *         description: Incorrect body
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 *     tags:
 *       - 4/ Team Management
 */
router.post('/add-to-team', checkTokenMiddleware, addToTeam);

module.exports = router;