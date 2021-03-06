import express from "express";
import { checkTokenMiddleware } from "../services/authorization";
import {addToCollection, createCollection, changeCollectionStatus} from "../controllers/collection-controller";

const router = express.Router();

/**
 * @swagger
 * /change-collection-status:
 *   put:
 *     summary: Change status of a collection
 *     description: change status of Collection with id CollectionID; status can be "Draft", "Published", "Archived"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - collectionId
 *                 status
 *             properties:
 *               status:
 *                 type: string
 *               collectionId:
 *                 type: integer
 *             example:
 *               collectionId: 2
 *               status: "archived"
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
 *       - 5/ Collection Management
 */
router.put('/change-collection-status', checkTokenMiddleware, changeCollectionStatus);

/**
 * @swagger
 * /add-to-collection:
 *   put:
 *     summary: Add NFT to collection
 *     description: Add NFT to the specified collection
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nftId
 *                 collectionId
 *             properties:
 *               nftId:
 *                 type: integer
 *               collectionId:
 *                 type: integer
 *             example:
 *               nftId: 1
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
 *       - 5/ Collection Management
 */
router.put('/add-to-collection', checkTokenMiddleware, addToCollection);

/**
 * @swagger
 * /collection:
 *   post:
 *     summary: Create a new collection
 *     description: Create a new collection
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *                 logo
 *                 status
 *             properties:
 *               name:
 *                 type: string
 *               logo:
 *                 type: string
 *               status:
 *                 type: string
 *             example:
 *               name: "The batman collection"
 *               logo: "http://mylog.com/batman"
 *               status: "Draft"
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Incorrect body
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *          description: Internal Server Error
 *     tags:
 *       - 5/ Collection Management
 */
router.post('/collection', checkTokenMiddleware, createCollection);

module.exports = router;