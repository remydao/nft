import { DataTypes } from "sequelize";

const nftModel = 
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
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("Draft", "Published"),
            allowNull: false
        },
        rate: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        numberOfRate: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        }
    };


export { nftModel };