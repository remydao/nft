import express from "express";
import { addHistory } from "../controllers/history-controller";

const router = express.Router();

/**
 * @swagger
 * /history:
 *   post:
 *     summary: Add an History
 *     description: Add a new selling history (method to bypass ./sellNFT)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nftId
 *                 sellerId
 *                 buyerId
 *                 collectionId
 *             properties:
 *               nftId:
 *                 type: integer
 *               sellerId:
 *                 type: integer
 *               buyerId:
 *                 type: integer
 *               collectionId:
 *                 type: integer
 *             example:
 *               nftId: 1
 *               sellerId: 2
 *               buyerId: 5
 *               collectionId: 2
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
 *       - 7/ Various
 */
router.post('/history', addHistory);

module.exports = router;