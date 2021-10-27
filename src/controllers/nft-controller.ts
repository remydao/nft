import {History, NFT, Team, User} from "../sequelize/sequelize";
import { extractToken } from "../services/authorization";
import { handleSpecificError, handleUnknownError, handleValidationError } from "../utils/error-handler";
import { logAction } from "../utils/logging";

const addNFT = async (req: any, res: any) => {
    if (!req.body.name || !req.body.price || !req.body.status || !req.body.userId || !req.body.collectionId)
        return handleSpecificError(res, 400, "Please put name, price, userId, status and collectionId in request body.");
    
    try {
        const token = extractToken(req.headers.authorization);

        if (token.role !== "admin")
            return handleSpecificError(res, 403, "You are not admin");

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
            return res.status(200).send("OK");
        })
    }
    catch (err: any) {
        console.log(err);

        if (err.name === "SequelizeValidationError")
            handleValidationError(err, res);
        else
            handleUnknownError(res);
    }
}


const sellNFT = async (req: any, res: any) => {
    // Check body
    if (!req.body.nftId || !req.body.buyerId)
        return handleSpecificError(res, 400, "Please put nftId, and buyerId in request body.");

    const token = extractToken(req.headers.authorization);

    const nft: any = await NFT.findByPk(req.body.nftId)
    if (!nft)
        return handleSpecificError(res, 404, "NFT with id = " + req.body.nftId + " not found.");

    const seller: any = await User.findByPk(token.id).catch((err) => { 
        return handleSpecificError(res, 500, "Internal server error");
    });

    if (!seller)
        return handleSpecificError(res, 500, "Internal server error");

    const buyer: any = await User.findByPk(req.body.buyerId);
    if (!buyer)
        return handleSpecificError(res, 404, "Buyer with id = " + req.body.buyerId + " not found.");

    const buyerTeam: any = await Team.findByPk(buyer.TeamId);
    if (!buyerTeam)
        return handleSpecificError(res, 404, "Buyer with id = " + req.body.buyerId + " is not in a team.");

    if (buyerTeam.balance < nft.price)
        return handleSpecificError(res, 403, "Buyer with id = " + req.body.buyerId + " hasn't got enough money.");

    const sellerTeam: any = await Team.findByPk(seller.TeamId);
    if (!sellerTeam)
        return handleSpecificError(res, 404, "Seller with id = " + seller.id + " is not in a team.");

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
        .then((history: any) =>
        {
            logAction(buyer.name, seller.name, nft.id);
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
    
    return res.status(200).send(`New nft status: ${nft.status} and collectionId : ${nft.CollectionId}`)
}
export { addNFT, sellNFT, rateNFT, updateNFT };