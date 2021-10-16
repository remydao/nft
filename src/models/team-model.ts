import { DataTypes } from "sequelize";

const teamModel = 
    {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        balance: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
    };


export { teamModel };