import { DataTypes } from "sequelize";
import {Collection} from "../sequelize/sequelize";

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
        collectionId: {
            type: DataTypes.BIGINT,
            references: {
                model: Collection,
                key: "id"
            }
        },
        numberOfRate: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };


export { nftModel };