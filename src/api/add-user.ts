import express from "express";
import { addUser, addUserAdmin } from "../controllers/user-controller";
import {checkAdminTokenMiddleware} from "../services/authorization";

const router = express.Router();


/**
 * @swagger
 * /user:
 *   post:
 *     summary: Add a new user with "user" role
 *     description: Add a new user with "user" role
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           required:
 *             - address
 *               name
 *               email
 *           properties:
 *             address:
 *               type: string
 *             name:
 *               type: string
 *             email:
 *               type: string
 *           example:
 *             address: "0xc0A2D17f12Adaa24719Ca3a05d6E62996c9DD396"
 *             name: David
 *             email: gazi@hotmail.com
 *     responses:
 *       201:
 *         description: OK
 *       400: 
 *         description: Incorrect body
 *     tags:
 *       - 1/ Add a user
 */

router.post('/user', addUser);



/**
 * @swagger
 * /admin/user:
 *   post:
 *     summary: Add a new user with a specific role
 *     description: Add a new user with a specific role
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           required:
 *             - address
 *               name
 *               email
 *               role
 *           properties:
 *             address:
 *               type: string
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             role:
 *               type: string
 *           example:
 *             address: "0xc0A2D17f12Adaa24719Ca3a05d6E62996c9DD396"
 *             name: David
 *             email: gazi@hotmail.com
 *             role: admin
 *     responses:
 *       201:
 *         description: OK
 *       400: 
 *         description: Incorrect body
 *     tags:
 *       - 1/ Add a user
 */

router.post('/admin/user', checkAdminTokenMiddleware, addUserAdmin)

module.exports = router;