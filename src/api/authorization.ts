import express from "express";
import { getLogin } from "../services/authorization";
const router = express.Router()

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Get a bearer token
 *     description: Returns your bearer token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           required:
 *             - email
 *               password
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *           example:
 *             email: gazi@hotmail.com
 *             password: password
 *     responses:
 *       200:
 *         description: OK
 *       400: 
 *         description: Incorrect body
 *       500:
 *         description: Internal Server Error
 *     tags:
 *       - 2/ Get bearer token
 */
router.post('/login', getLogin)

module.exports = router;