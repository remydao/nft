import express from "express";
import {createCollection} from "../controllers/collection-controller";
import {checkAdminTokenMiddleware} from "../services/authorization";

const router = express.Router();

router.post('/collection', createCollection);

module.exports = router;