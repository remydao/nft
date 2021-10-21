import {User, Team, NFT} from "../sequelize/sequelize";
import {Sequelize} from "sequelize";

const getBestSellerTeams = async (req: any, res: any) => {
    
}

const getBestSellerCollections = async (req: any, res: any) => {

}

const getMostRatedNFTs = async (req: any, res: any) => {
    await NFT.findAll({
        attributes: [[Sequelize.fn('max', Sequelize.col('rate')), 'max']],
        raw: true
    })
}

const getLastSells = async (req: any, res: any) => {

}

const getOwnSells = async (req: any, res: any) => {

}

export { getBestSellerTeams, getBestSellerCollections, getMostRatedNFTs, getLastSells, getOwnSells };