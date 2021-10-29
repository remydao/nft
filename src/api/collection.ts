import express from "express";
import { checkTokenMiddleware } from "../services/authorization";
import {addToCollection, createCollection} from "../controllers/collection-controller";

const router = express.Router();

router.put('/change-collection-status', checkTokenMiddleware,);
router.put('/add-to-collection', addToCollection);
router.post('/collection', createCollection);

module.exports = router;