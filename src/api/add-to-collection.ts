import express from "express";
import {addToCollection} from "../controllers/collection-controller";
import {checkAdminTokenMiddleware} from "../services/authorization";

const router = express.Router();

router.post('/add-to-collection', addToCollection);

module.exports = router;