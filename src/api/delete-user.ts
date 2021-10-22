import express from "express";
import { deleteUser } from "../controllers/user-controller";
import { checkAdminTokenMiddleware } from "../services/authorization";

const router = express.Router();

router.delete('/user/:userId', checkAdminTokenMiddleware, deleteUser);

module.exports = router;