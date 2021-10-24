import {History, NFT} from "../sequelize/sequelize";


const addHistory = async (req: any, res: any) => {
    if (!req.body.buyerId|| !req.body.sellerId || !req.body.NFTId)
        return res.status(400).send("Please put buyerId, sellerId and NFTId in request body.");

    try {

        const history = {
            buyerId: req.body.buyerId,
            sellerId: req.body.sellerId,
            NFTId: req.body.NFTId,
            date: Date.now()
        };

        await History.create(history)
            .then((nft: any) =>
            {
                console.log("history created:" + JSON.stringify(nft));
                return res.status(200).send("OK");
            })
    }
    catch (err: any) {
        console.log(err);
    }
}
export { addHistory };