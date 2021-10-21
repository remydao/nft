import {User, Team, NFT, History} from "../sequelize/sequelize";
import {Sequelize} from "sequelize";

const getBestSellerTeams = async (req: any, res: any) => {
    
}

const getBestSellerCollections = async (req: any, res: any) => {

}

const getMostRatedNFTs = async (req: any, res: any) => {
    await NFT.findAll({
        attributes: [[Sequelize.fn('max', Sequelize.col('rate')), 'MostRatedNFTs']],
        raw: true
    })
}

const getLastSells = async (req: any, res: any) => {
    await History.findAll({
        attributes: [[Sequelize.fn('max', Sequelize.col('rate')), 'LastSells']],
        raw: true
    })
}

const getOwnSells = async (req: any, res: any) => {

}

export { getBestSellerTeams, getBestSellerCollections, getMostRatedNFTs, getLastSells, getOwnSells };