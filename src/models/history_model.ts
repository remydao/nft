import { DataTypes } from "sequelize";

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
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}

export { historyModel };