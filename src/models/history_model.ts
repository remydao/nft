import { DataTypes } from "sequelize";

const ownerHistoryModel = {
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
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}

export { ownerHistoryModel };