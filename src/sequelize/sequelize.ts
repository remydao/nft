import { Sequelize } from "sequelize";
import { collectionModel } from "../models/collection-model";
import { nftModel } from "../models/nft-model";
import { teamModel } from "../models/team-model";
import { userModel } from '../models/user-model';
import { historyModel } from "../models/history_model";

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

// All models are defined here
const User = sequelize.define('User', userModel);
const Team = sequelize.define('Team', teamModel);
const NFT = sequelize.define('NFT', nftModel);
const Collection = sequelize.define('Collection', collectionModel);
const History = sequelize.define('ownerHistory', historyModel)

// Foreign keys
Team.hasMany(User, { as: "users" });
User.belongsTo(Team, {
  foreignKey: "TeamId",
  as: "team",
});

Collection.hasMany(NFT, { as: "NFTs"});
NFT.belongsTo(Collection, {
    foreignKey: "collectionId",
    as: "collection",
});

NFT.hasOne(User, { as: "owner" });


// Attention ENLEVER LE FORCE QUI ERASE LES TABLES A CHAQUE STARTUP
sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
})

export { User, Team, NFT, Collection, History };