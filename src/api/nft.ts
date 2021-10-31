import express from "express";
import { addNFT, rateNFT, sellNFT, updateNFT } from "../controllers/nft-controller";
import { checkAdminTokenMiddleware, checkTokenMiddleware } from "../services/authorization";

const router = express.Router();

/**
 * @swagger
 * /admin/add-nft:
 *   post:
 *     summary: Add an NFT
 *     description: Adds an new NFT
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: integer
 *               status:
 *                 type: string
 *               userId:
 *                 type: integer
 *               filename:
 *                 type: string
 *                 format: binary
 *             example:
 *               name: David
 *               price: 10
 *               status: Draft
 *               userId: 1
 *     responses:
 *       200:
 *         description: OK
 *       400: 
 *         description: Incorrect body
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *     tags:
 *       - 3/ NFT Management
 */
router.post('/admin/add-nft', checkAdminTokenMiddleware, addNFT);


/**
 * @swagger
 * /sell-nft:
 *   put:
 *     summary: Sell an NFT
 *     description: Sells an NFT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           required:
 *             - nftId
 *               buyerId
 *           properties:
 *             nftId:
 *               type: integer
 *             buyerId:
 *               type: integer
 *           example:
 *             nftId: 1
 *             buyerId: 1
 *     responses:
 *       200:
 *         description: OK
 *       400: 
 *         description: Incorrect body
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: NFT/Buyer/Seller Not found
 *     tags:
 *       - 3/ NFT Management
 */
router.put('/sell-nft', checkTokenMiddleware, sellNFT);

/**
 * @swagger
 * /rate-nft:
 *   put:
 *     summary: Rate an NFT
 *     description: Rate an NFT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           required:
 *             - nftId
 *               rate
 *           properties:
 *             nftId:
 *               type: integer
 *             rate:
 *               type: integer
 *           example:
 *             nftId: 1
 *             rate: 5
 *     responses:
 *       200:
 *         description: OK
 *       400: 
 *         description: Incorrect body
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: NFT not found
 *     tags:
 *       - 7/ Various
 */
router.put('/rate-nft', checkTokenMiddleware, rateNFT);


/**
 * @swagger
 * /update-nft:
 *   put:
 *     summary: Update NFT status or collection
 *     description: Update NFT status or collection
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           required:
 *             - nftId
 *           properties:
 *             nftId:
 *               type: integer
 *             status:
 *               type: string
 *             collectionId:
 *               type: integer
 *           example:
 *             nftId: 1
 *             collectionId: 5
 *     responses:
 *       200:
 *         description: OK
 *       400: 
 *         description: Incorrect body
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: NFT not found
 *     tags:
 *       - 3/ NFT Management
 */
router.put('/update-nft', checkTokenMiddleware, updateNFT)

module.exports = router;