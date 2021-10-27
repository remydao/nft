import express from "express";
import {addUser, addUserAdmin} from "../controllers/user-controller";
import {checkAdminTokenMiddleware} from "../services/authorization";

const router = express.Router();



/**
 * @swagger
 * /user:
 *   post:
 *     summary: Add a new user with "user" role
 *     description: Add a new user with "user" role
 *     parameters:
 *       - in: body
 *         name: parameters
 *         description: parameters
 *         schema:
 *           type: object
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
 *             address: s
 *             name: David
 *             email: gazi@hotmail.com
 *     responses:
 *       200:
 *         description: OK
 *       400: 
 *         description: Incorrect body
 */
router.post('/user', addUser);

// TODO: router.post('/admin/user', checkAdminTokenMiddleware, addUserAdmin) the real route

router.post('/admin/user', addUserAdmin)

module.exports = router;