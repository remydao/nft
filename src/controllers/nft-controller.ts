import {History, NFT, Team, User} from "../sequelize/sequelize";
import { extractToken } from "../services/authorization";
import { handleValidationError } from "../utils/error-handler";

const addNFT = async (req: any, res: any) => {
    if (!req.body.name || !req.body.price || !req.body.status || !req.body.userId || !req.body.collectionId)
        return res.status(400).send("Please put name, price, userId, status and collectionId in request body.");
    
    try {
        const token = extractToken(req.headers.authorization);
        if (token.role !== "admin")
            return res.status(403).send("You are not admin");

        const nft = {
            name: req.body.name,
            price: req.body.price,
            status: req.body.status,
            rate: 0,
            numberOfRate: 0,
            UserId: req.body.userId,
            CollectionId: req.body.collectionId
        };
        
        await NFT.create(nft)
        .then((nft: any) =>
        {
            console.log("NFT created:" + JSON.stringify(nft));
            return res.status(200).send("OK");
        })
    }
    catch (err: any) {
        console.log(err);

        if (err.name === "SequelizeValidationError")
            handleValidationError(err, res);
    }
}


const sellNFT = async (req: any, res: any) => {
    // Check body
    if (!req.body.nftId || !req.body.buyerId)
        return res.status(400).send("Please put nftId, and buyerId in request body.");

    const token = extractToken(req.headers.authorization);

    const nft: any = await NFT.findByPk(req.body.nftId)
    if (!nft)
        return res.status(404).send("NFT with id = " + req.body.nftId + " not found.");

    const seller: any = await User.findByPk(token.id).catch((err) => { 
        return res.status(500).send("Internal server error");
    });

    if (!seller)
        return res.status(500).send("Internal server error");

    const buyer: any = await User.findByPk(req.body.buyerId);
    if (!buyer)
        return res.status(404).send("Buyer with id = " + req.body.buyerId + " not found.");

    const buyerTeam: any = await Team.findByPk(buyer.TeamId);
    if (!buyerTeam)
        return res.status(404).send("Buyer with id = " + req.body.buyerId + " is not in a team.");

    if (buyerTeam.balance < nft.price)
        return res.status(403).send("Buyer with id = " + req.body.buyerId + " hasn't got enough money.");

    const sellerTeam: any = await Team.findByPk(seller.TeamId);
    if (!sellerTeam)
        return res.status(404).send("Seller with id = " + seller.id + " is not in a team.");

    buyerTeam.balance -= nft.price;
    buyer.save();

    sellerTeam.balance += nft.price;
    seller.save();

    const history = {
        buyerId: buyer.id,
        sellerId: seller.id,
        NFTId: nft.id,
        date: Date.now()
    };

    await History.create(history)
        .then((nft: any) =>
        {
            console.log("history created:" + JSON.stringify(nft));
            return res.status(200).send("OK");
        });

};


const rateNFT = async (req: any, res: any) => {
    // Check body
    if (!req.body.nftId || !req.body.rate)
        return res.status(400).send("Please put nftId in request body.");

    const nft: any = await NFT.findByPk(req.body.nftId)
    if (!nft)
        return res.status(404).send("NFT with id = " + req.body.nftId + " not found.");

    const token = extractToken(req.headers.authorization);
    if (!token)
        return res.status(403).send("You are not logged in");

    nft.rate = (nft.rate * nft.numberOfRate + req.body.rate) / (nft.numberOfRate + 1);
    nft.numberOfRate++;
    nft.save();
    return res.status(200).send(`new nft rate: ${nft.rate}`)
}

const updateNFT = async (req: any, res: any) => {
    if (!req.body.nftId)
        return res.status(400).send("Please put nftId in request body.");
    const nft: any = await NFT.findByPk(req.body.nftId)
    if (!nft)
        return res.status(404).send("NFT with id = " + req.body.nftId + " not found.");
    if (req.body.status)
        nft.status = req.body.status
    if (req.body.collectionId)
        nft.CollectionId = req.body.collectionId
    nft.save();
    return res.status(200).send(`new nft status: ${nft.status} and collectionId : ${nft.CollectionId}`)
}
export { addNFT, sellNFT, rateNFT, updateNFT };