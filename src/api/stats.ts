import express from "express";
import { getBestSellerCollections, getBestSellerTeams, getLastSells, getMostRatedNFTs, getOwnSells } from "../controllers/stats-controller";
import { checkTokenMiddleware } from "../services/authorization";
import {getCollection} from "../controllers/collection-controller";
import {getTeam} from "../controllers/team-controller";

const router = express.Router();

/**
 * @swagger
 * /stats/best-seller-teams:
 *   get:
 *     summary: Get best seller teams
 *     description: Get best seller teams
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limit
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: No sales history
 *       500:
 *         description: Problem in database
 */
router.get('/stats/best-seller-teams', getBestSellerTeams);


/**
 * @swagger
 * /stats/best-seller-collections:
 *   get:
 *     summary: Get best seller collections
 *     description: Get best seller collection
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limit
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: No History of Collection sales
 *       500:
 *         description: Problem in database
 */
router.get('/stats/best-seller-collections', getBestSellerCollections);


/**
 * @swagger
 * /stats/best-seller-collections:
 *   get:
 *     summary: Get best seller teams
 *     description: Get best seller teams
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limit
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: No NFT
 *       500:
 *         description: Problem in database
 */
router.get('/stats/most-rated-nfts', getMostRatedNFTs);
router.get('/stats/last-sells', getLastSells);
router.get('/stats/own-sells', checkTokenMiddleware, getOwnSells);
router.get('/collection', getCollection)
router.get('/team', getTeam)

module.exports = router;