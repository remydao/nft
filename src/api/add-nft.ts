import express from "express";
import { NFT } from "../sequelize/sequelize";

const router = express.Router();

// Add a nft to the database
router.post('/admin/add-nft', async (req: any, res: any) => {
    // Check body
    if (!req.body.name || !req.body.price || !req.body.status)
        return res.status(400).send("Please put name, price and status in request body.");
    
    var nft = {
        name: req.body.name,
        price: req.body.price,
        status: req.body.status,
    };
    

    await NFT.create(nft)
    .then((nft: any) => 
    {
        console.log("NFT created:" + JSON.stringify(nft));
        return res.status(200).send("OK");
    })
    .catch((err: any) => {
        console.log(err);
        return res.status(400).send("Problem in request");
    });
});

module.exports = router;