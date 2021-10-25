import express from "express";
import {addUser, addUserAdmin} from "../controllers/user-controller";
import {checkAdminTokenMiddleware} from "../services/authorization";

const router = express.Router();

router.post('/user', addUser);
//TODO
//router.post('/admin/user', checkAdminTokenMiddleware, addUserAdmin) the real route
router.post('/admin/user', addUserAdmin)

module.exports = router;