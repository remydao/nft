import express from "express";
import { checkTokenMiddleware } from "../services/authorization";

const router = express.Router();

router.put('/change-collection-status', checkTokenMiddleware,);

module.exports = router;