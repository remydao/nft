import { DataTypes } from "sequelize";

const ownerHistoryModel = {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    ownerId: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    NFTId: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    saleDate: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}

export { ownerHistoryModel };