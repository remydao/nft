import { NFT, Team, User } from "../sequelize/sequelize";
import { extractToken } from "../services/authorization";
import { handleValidationError } from "../utils/error-handler";

const addNFT = async (req: any, res: any) => {
    // Check body
    if (!req.body.name || !req.body.price || !req.body.status)
        return res.status(400).send("Please put name, price and status in request body.");
    
    try {
        const token = extractToken(req.headers.authorization);
        if (token.role !== "admin")
            return res.status(403).send("You are not admin");

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

    var buyerTeam: any = buyer.team;
    if (!buyerTeam)
        return res.status(404).send("Buyer with id = " + req.body.buyerId + " is not in a team.");

    if (buyerTeam.balance < nft.price)
        return res.status(403).send("Buyer with id = " + req.body.buyerId + " hasn't got enough money.");

    var sellerTeam = seller.team
    if (!sellerTeam)
        return res.status(404).send("Seller with id = " + seller.id + " is not in a team.");

    buyerTeam.balance -= nft.price;
    buyer.save();

    sellerTeam.balance += nft.price;
    seller.save();
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
    nft.save();
    return res.status(200).send(`new nft rate: ${nft.rate}`)

}


export { addNFT, sellNFT, rateNFT, updateNFT };