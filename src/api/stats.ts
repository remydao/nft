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
 *       500:
 *         description: Problem in database
 */
router.get('/stats/best-seller-collections', getBestSellerCollections);


/**
 * @swagger
 * /stats/most-rated-nfts:
 *   get:
 *     summary: Get Most Rated NFTs
 *     description: Get Most Rated NFTs
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
 *       500:
 *         description: Problem in database
 */
router.get('/stats/most-rated-nfts', getMostRatedNFTs);


/**
 * @swagger
 * /stats/last-sells:
 *   get:
 *     summary: Get last sells
 *     description: Get last sells
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
 *       500:
 *         description: Problem in database
 */
router.get('/stats/last-sells', getLastSells);


/**
 * @swagger
 * /stats/own-sells:
 *   get:
 *     summary: Get own sells
 *     description: Get own sells
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
 *       500:
 *         description: Problem in database
 */
router.get('/stats/own-sells', checkTokenMiddleware, getOwnSells);


/**
 * @swagger
 * /collection:
 *   get:
 *     summary: Get collections
 *     description: Get all collections
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Problem in database
 */
router.get('/collection', getCollection)


/**
 * @swagger
 * /team:
 *   get:
 *     summary: Get teams
 *     description: Get teams
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Problem in database
 */
router.get('/team', getTeam)

module.exports = router;