import { DataTypes } from "sequelize";

const collectionModel = 
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
        logo: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.ENUM("Draft", "Published", "Archived"),
            allowNull: false
        },
        autoArchiveTime: {
            type: DataTypes.DATE,
        }
    };


export { collectionModel };