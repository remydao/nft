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
 *     parameters:
 *       - in: body
 *         name: NFT parameters
 *         description: NFT parameters
 *         schema:
 *           type: object
 *           required:
 *             - name
 *               price
 *               status
 *               userId
 *               collectionId
 *           properties:
 *             name:
 *               type: string
 *             price:
 *               type: integer
 *             status:
 *               type: string
 *             userId:
 *               type: integer
 *             collectionId:
 *               type: integer
 *           example:
 *             name: David
 *             price: 10
 *             status: Draft
 *             userId: 1
 *             collectionId: 1
 *     responses:
 *       200:
 *         description: OK
 *       400: 
 *         description: Incorrect body
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post('/admin/add-nft', checkAdminTokenMiddleware, addNFT);


/**
 * @swagger
 * /sell-nft:
 *   put:
 *     summary: Sell an NFT
 *     description: Sells an NFT
 *     parameters:
 *       - in: body
 *         name: parameters
 *         description: parameters
 *         schema:
 *           type: object
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
 */
router.put('/sell-nft', checkTokenMiddleware, sellNFT);

/**
 * @swagger
 * /rate-nft:
 *   put:
 *     summary: Rate an NFT
 *     description: Rate an NFT
 *     parameters:
 *       - in: body
 *         name: parameters
 *         description: parameters
 *         schema:
 *           type: object
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
 */
router.put('/rate-nft', checkTokenMiddleware, rateNFT);


/**
 * @swagger
 * /update-nft:
 *   put:
 *     summary: Update NFT status or collection
 *     description: Update NFT status or collection
 *     parameters:
 *       - in: body
 *         name: parameters
 *         description: parameters
 *         schema:
 *           type: object
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
 */
router.put('/update-nft', checkTokenMiddleware, updateNFT)

module.exports = router;