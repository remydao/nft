import express from "express";
import {addCollection} from "../controllers/collection-controller";
import {checkAdminTokenMiddleware} from "../services/authorization";

const router = express.Router();

router.post('/collection', addCollection);

module.exports = router;