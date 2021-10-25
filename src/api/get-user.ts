import express from "express";
import { getUser } from "../controllers/user-controller";
import {checkAdminTokenMiddleware} from "../services/authorization";

const router = express.Router();

router.get('/user', getUser)

module.exports = router;