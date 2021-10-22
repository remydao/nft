import express from "express";
import { addNFT, sellNFT } from "../controllers/nft-controller";

const router = express.Router();

// Add a nft to the database
router.post('/admin/add-nft', addNFT);

router.put('/sell-nft/', sellNFT);

module.exports = router;