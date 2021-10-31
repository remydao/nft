import express from "express";
import { addToBalance } from "../controllers/team-controller";
import { checkAdminTokenMiddleware } from "../services/authorization";


const router = express.Router();

/**
 * @swagger
 * /admin/balance:
 *   put:
 *     summary: Change a specific team balance
 *     description: Change a team balance based on the teamId parameter on the req.body
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           required:
 *             - balance
 *               teamId
 *           properties:
 *             balance:
 *               type: integer
 *             teamId:
 *               type: integer
 *           example:
 *             balance: 1200
 *             teamId: 1
 *     responses:
 *       201:
 *         description: Balance has been changed
 *       400:
 *         description: Incorrect body, teamId or balance are not formatted correctly.
 *       404:
 *         description: The teamId cannot be found.
 *       500:
 *         description: Problem in database
 *     tags:
 *       - 4/ Team Management
 */
router.put('/admin/balance', checkAdminTokenMiddleware, addToBalance)

module.exports = router;