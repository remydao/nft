import express from "express";
import { addNFT, rateNFT, sellNFT } from "../controllers/nft-controller";
import { checkAdminTokenMiddleware, checkTokenMiddleware } from "../services/authorization";

const router = express.Router();

// Add a nft to the database
router.post('/admin/add-nft', checkAdminTokenMiddleware, addNFT);

router.put('/sell-nft/', checkTokenMiddleware, sellNFT);

router.put('/rate-nft/', checkTokenMiddleware, rateNFT);

module.exports = router;