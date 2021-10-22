import express from "express";
import {addUser, addUserAdmin} from "../controllers/user-controller";
import {checkAdminTokenMiddleware} from "../services/authorization";

const router = express.Router();

router.post('/user', addUser);
router.post('/admin/user', checkAdminTokenMiddleware, addUserAdmin)

module.exports = router;