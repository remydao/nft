import {NFT} from "../sequelize/sequelize";
import {Sequelize} from "sequelize";

const getMostRated = async (req: any, res: any) => {
    await NFT.findAll({
        attributes: [[Sequelize.fn('max', Sequelize.col('rate')), 'max']],
        raw: true
    })
}