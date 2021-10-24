import express from "express";
import { addNFT, rateNFT, sellNFT, updateNFT } from "../controllers/nft-controller";
import { checkAdminTokenMiddleware, checkTokenMiddleware } from "../services/authorization";

const router = express.Router();

// Add a nft to the database
router.post('/admin/add-nft', checkAdminTokenMiddleware, addNFT);

router.put('/sell-nft', checkTokenMiddleware, sellNFT);

router.put('/rate-nft', checkTokenMiddleware, rateNFT);

router.put('/update-nft', checkTokenMiddleware, updateNFT)

module.exports = router;