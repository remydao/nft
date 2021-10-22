import express from "express";
import { getBestSellerCollections, getBestSellerTeams, getLastSells, getMostRatedNFTs, getOwnSells } from "../controllers/stats-controller";
import { checkTokenMiddleware } from "../services/authorization";

const router = express.Router();

router.post('/stats/best-seller-teams', getBestSellerTeams);
router.post('/stats/best-seller-collections', getBestSellerCollections);
router.post('/stats/most-rated-nfts', getMostRatedNFTs);
router.post('/stats/last-sells', getLastSells);
router.post('/stats/own-sells', checkTokenMiddleware, getOwnSells);

module.exports = router;