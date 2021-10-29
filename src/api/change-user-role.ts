import express from "express";
import { checkAdminTokenMiddleware } from "../services/authorization";
import { updateUserRole } from "../controllers/user-controller"

const router = express.Router();

/**
 * @swagger
 * /user/{userId}:
 *   put:
 *     summary: Change a user role
 *     description: Change a user role
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         description: User id
 *     responses:
 *       200:
 *         description: User role correclty modified
 *       400:
 *         description: Incorrect body, or cannot delete last admin
 *       500:
 *         description: Problem in database
 */
router.put('/user/:userId', checkAdminTokenMiddleware, updateUserRole);

module.exports = router;