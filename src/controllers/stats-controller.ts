import {User, Team, NFT, History, Collection} from "../index";
import {Sequelize} from "sequelize";
import { extractToken} from "../services/authorization";



const getPagination = (page: any, size: any) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

const getPagingData = (data: any, page: any, limit: any) => {
    const totalItems = data.length;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, data, totalPages, currentPage };
};


//TODO get bestSellers but not the teams. Need to be change
const getBestSellerTeams = async (req: any, res: any) => {
    const { page, size} = req.query;
    const { limit, offset } = getPagination(page, size);
    await History.findAll({
            include: "seller",
            attributes: [
                'seller.TeamId',
                [Sequelize.fn('COUNT', Sequelize.col('seller.TeamId')), 'Sales']
            ],
            group: ['seller.TeamId'],
            limit: limit,
            offset: offset,
            order: [[Sequelize.literal('Sales'), 'DESC']]
        })
        .then(async (sellers: any) => {
            if (sellers === null || sellers.length < 1)
                return res.status(200).send("No sales history");

            const response = getPagingData(sellers, page, limit);
            return res.status(200).json({content: response})
        })
        .catch((err: any) => {
            console.log(err);
            return res.status(500).send("Error on database");
        })
}

const getBestSellerCollections = async (req: any, res: any) => {

    const { page, size} = req.query;
    const { limit, offset } = getPagination(page, size);

    await History.findAll({
            attributes: [
                [Sequelize.fn('COUNT', Sequelize.col('CollectionId')), 'NumberNftSold']
            ],
            group: ['CollectionId'],
            limit: limit,
            offset: offset,
            order: [[Sequelize.literal('NumberNftSold'), 'DESC']]

        })
        .then(async (Collections: any) => {
            if (Collections === null || Collections.length < 1)
                return res.status(200).send("No History of Collection sales");

            const response = getPagingData(Collections, page, limit);
            return res.status(200).json({content: response})
        })
        .catch((err:any) => {
            console.log(err);
            return res.status(500).send("Error on database");
        })
}

const getMostRatedNFTs = async (req: any, res: any) => {

    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    await NFT.findAll({
        order:[['rate', 'DESC']],
        limit: limit,
        offset: offset
        })
        .then(async  (NFTs: any) => {
            if (NFTs === null || NFTs.length < 1) {
                console.log(`${limit}, ${offset}`)
                return res.status(200).send("No NFTs");
            }
            const response = getPagingData(NFTs, page, limit);
            return res.status(200).json({content: response})
        })
        .catch((err: any) => {
            console.log(err);
            return res.status(500).send("Error on database");
        });
}

const getLastSells = async (req: any, res: any) => {

    const { page, size} = req.query;
    const { limit, offset } = getPagination(page, size);
    await History.findAll({
        order: [['date', 'DESC']],
        raw: true,
        limit: limit,
        offset: offset
        })
        .then(async (lastSells: any) => {
            if (lastSells.length < 1)
                return res.status(200).send("No sells");
            const response = getPagingData(lastSells, page, limit);
            return res.status(200).json({content: response})
        })
        .catch((err: any) => {
            console.log(err)
            return res.status(500).send("Error on dataBase")
        })
}

const getOwnSells = async (req: any, res: any) => {

    const { page, size} = req.query;
    const { limit, offset } = getPagination(page, size);
    const ownerId = extractToken(req.headers.authorization).id;
    await History.findAll( {
            where: {
                sellerId: ownerId
            },
            limit: limit,
            offset: offset
        })
        .then(async (ownSells: any) => {
            if (ownSells.length < 1)
                return res.status(200).send("You don't have any sells")
            const response = getPagingData(ownSells, page, limit);
            return res.status(200).json({content: response})
        })
        .catch((err: any) => {
            console.log(err)
            return res.status(500).send("Error on dataBase")
        })
}

export { getBestSellerTeams, getBestSellerCollections, getMostRatedNFTs, getLastSells, getOwnSells };