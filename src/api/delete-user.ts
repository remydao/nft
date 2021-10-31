import express from "express";
import { deleteUser } from "../controllers/user-controller";
import { checkAdminTokenMiddleware } from "../services/authorization";

const router = express.Router();


/**
 * @swagger
 * /user/{userId}:
 *   delete:
 *     summary: Delete a user
 *     description: Delete a user
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         description: User id to delete
 *     responses:
 *       200:
 *         description: User deleted
 *       400:
 *         description: Unspecified userId
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Problem in database
 *     tags:
 *       - 7/ Various
 */
router.delete('/user/:userId', checkAdminTokenMiddleware, deleteUser);

module.exports = router;