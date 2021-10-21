import {User, Team, NFT, History} from "../sequelize/sequelize";
import {Sequelize} from "sequelize";
import { extractToken} from "../services/authorization";

const getBestSellerTeams = async (req: any, res: any) => {
    
}

const getBestSellerCollections = async (req: any, res: any) => {

}

const getMostRatedNFTs = async (req: any, res: any) => {
    await NFT.findAll({
        attributes: [[Sequelize.fn('max', Sequelize.col('rate')), 'MostRatedNFTs']],
        raw: true
        })
        .then(async  (NFTs: any) => {
            if (NFTs.length < 1)
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
        attributes: [[Sequelize.fn('max', Sequelize.col('rate')), 'LastSells']],
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