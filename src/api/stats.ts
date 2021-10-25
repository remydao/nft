import express from "express";
import { getBestSellerCollections, getBestSellerTeams, getLastSells, getMostRatedNFTs, getOwnSells } from "../controllers/stats-controller";
import { checkTokenMiddleware } from "../services/authorization";
import {getCollection} from "../controllers/collection-controller";
import {getTeam} from "../controllers/team-controller";

const router = express.Router();

router.get('/stats/best-seller-teams', getBestSellerTeams);
router.get('/stats/best-seller-collections', getBestSellerCollections);
router.get('/stats/most-rated-nfts', getMostRatedNFTs);
router.get('/stats/last-sells', getLastSells);
router.get('/stats/own-sells', checkTokenMiddleware, getOwnSells);
router.get('/collection', getCollection)
router.get('/team', getTeam)

module.exports = router;