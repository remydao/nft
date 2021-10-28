import express from "express";
import { getUser } from "../controllers/user-controller";
import {checkAdminTokenMiddleware} from "../services/authorization";

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
 */
router.get('/user', getUser)

module.exports = router;