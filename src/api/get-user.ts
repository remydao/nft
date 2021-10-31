import express from "express";
import { getUser } from "../controllers/user-controller";

const router = express.Router();

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     description: Get all users
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Problem in database
 *     tags:
 *       - 7/ Various
 */
router.get('/user', getUser)

module.exports = router;