import { NFT, User } from "../sequelize/sequelize";
import { handleValidationError } from "../utils/error-handler";

const addNFT = async (req: any, res: any) => {
    // Check body
    if (!req.body.name || !req.body.price || !req.body.status)
        return res.status(400).send("Please put name, price and status in request body.");
    
    try {
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

    const nft: any = await NFT.findByPk(req.body.nftId)
    if (!nft)
        return res.status(404).send("NFT with id = " + req.body.nftId + " not found.");

    /* TODO: GET ID FROM AUTHORIZATION HEADER TO GET SELLER */
    var sellerId: number = 1;
    const seller: any = await User.findByPk(sellerId);
    /* TODO: CHECK SELLER != null */

    const buyer: any = await User.findByPk(req.body.buyerId);
    if (!buyer)
        return res.status(404).send("Buyer with id = " + req.body.buyerId + " not found.");

    var buyerTeam: any = buyer.team;
    if (!buyerTeam)
        return res.status(404).send("Buyer with id = " + req.body.buyerId + " is not in a team.");

    if (buyerTeam.balance < nft.price)
        return res.status(403).send("Buyer with id = " + req.body.buyerId + " hasn't got enough money.");

    buyerTeam.balance -= nft.price;
    buyer.save();

    seller.balance += nft.price;
    seller.save();
};

export { addNFT, sellNFT };