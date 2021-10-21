import express from "express";
import { getBestSellerCollections, getBestSellerTeams, getLastSells, getMostRatedNFTs, getOwnSells } from "../controllers/stats-controller";
import { checkTokenMiddleware } from "../services/authorization";

const router = express.Router();

router.get('/stats/best-seller-teams', getBestSellerTeams);
router.get('/stats/best-seller-collections', getBestSellerCollections);
router.get('/stats/most-rated-nfts', getMostRatedNFTs);
router.get('/stats/last-sells', getLastSells);
router.get('/stats/own-sells', checkTokenMiddleware, getOwnSells);

module.exports = router;