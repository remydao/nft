import { DataTypes } from "sequelize";
import {Collection, NFT} from "../sequelize/sequelize";

const historyModel = {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    buyerId: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    sellerId: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    NFTId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: NFT,
            key: "id"
        }
    },
    CollectionId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
            model: Collection,
            key: "id"
        }
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}

export { historyModel };