import express from "express";
import {addHistory} from "../controllers/history-controller";
import {checkAdminTokenMiddleware} from "../services/authorization";

const router = express.Router();

router.post('/history', addHistory);

module.exports = router;