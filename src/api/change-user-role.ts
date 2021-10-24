import express from "express";
import { checkAdminTokenMiddleware } from "../services/authorization";
import { updateUserRole } from "../controllers/user-controller"

const router = express.Router();

router.put('/user/:userId', checkAdminTokenMiddleware, updateUserRole);

module.exports = router;