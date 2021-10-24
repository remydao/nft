import {User, Team, NFT, History, Collection} from "../sequelize/sequelize";
import {Sequelize} from "sequelize";
import { extractToken} from "../services/authorization";

//TODO get bestSellers but not the teams. Need to be change
const getBestSellerTeams = async (req: any, res: any) => {
    await History.findAll({
            attributes: [
                [Sequelize.fn('COUNT', Sequelize.col('sellerId')), 'sellers']
            ],
            group: ['sellerId']
        })
        .then(async (sellers: any) => {
            if (sellers === null || sellers.length < 1)
                return res.status(400).send("No sales history");
            return res.status(200).json({ content: sellers })
        })
        .catch((err: any) => {
            console.log(err);
            return res.status(400).send("error on dataBase")
        })
}

const getBestSellerCollections = async (req: any, res: any) => {
    await History.findAll({
            include: "NFT",
            attributes: [
                [Sequelize.fn('COUNT', Sequelize.col('NFT.collectionId')), 'Collections']
            ],
            group: ['NFT.collectionId']

        })
        .then(async (Collections: any) => {
            if (Collections === null || Collections.length < 1)
                return res.status(400).send("No History of Collection sales");
            return res.status(200).json({content: Collections})
        })
        .catch((err:any) => {
            console.log(err);
            return res.status(400).send("error on dataBase");
        })
}

const getMostRatedNFTs = async (req: any, res: any) => {
    await NFT.findAll({
        order:[['rate', 'DESC']]
        })
        .then(async  (NFTs: any) => {
            if (NFTs === null || NFTs.length < 1)
                return res.status(400).send("No NFTs");
            return res.status(200).json({content: NFTs})
        })
        .catch((err: any) => {
            // have to implement error handler
            console.log(err);
            return res.status(400).send("Error on dataBase");
        });
}

const getLastSells = async (req: any, res: any) => {
    await History.findAll({
        order: [['date', 'DESC']],
        raw: true
        })
        .then(async (lastSells: any) => {
            if (lastSells.length < 1)
                return res.status(400).send("No sells");
            return res.status(200).json({content: lastSells})
        })
        .catch((err: any) => {
            console.log(err)
            return res.status(400).send("Error on dataBase")
        })
}

const getOwnSells = async (req: any, res: any) => {
    const ownerId = extractToken(req.headers.authorization).id;
    await History.findAll( {
        where: {
            sellerId: ownerId
        }
        })
        .then(async (ownSells: any) => {
            if (ownSells.length < 1)
                return res.status(400).send("You don't have any sells")
            return res.status(200).json({content: ownSells})
        })
        .catch((err: any) => {
            console.log(err)
            return res.status(400).send("Error on dataBase")
        })
}

export { getBestSellerTeams, getBestSellerCollections, getMostRatedNFTs, getLastSells, getOwnSells };