import { Sequelize } from "sequelize";
import { collectionModel } from "../models/collection-model";
import { nftModel } from "../models/nft-model";
import { teamModel } from "../models/team-model";
import { userModel } from '../models/user-model';
import { historyModel } from "../models/history-model";

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false
});

// All models are defined here
const User = sequelize.define('User', userModel);
const Team = sequelize.define('Team', teamModel);
const NFT = sequelize.define('NFT', nftModel);
const Collection = sequelize.define('Collection', collectionModel);
const History = sequelize.define('History', historyModel)

// Foreign keys
Team.hasMany(User, { as: "users" });
User.belongsTo(Team, {
  foreignKey: "TeamId",
  as: "team",
});

Team.hasMany(Collection, { as: "collections"});
Collection.belongsTo(Team);

Collection.hasMany(NFT, { as: "NFTs"});
NFT.belongsTo(Collection)
NFT.belongsTo(User, {
    foreignKey: "UserId",
    as: "user"
});

NFT.hasMany(History)
History.belongsTo(NFT)
History.belongsTo(User, {
    foreignKey: "buyerId",
    as: "buyer"
})
History.belongsTo(User, {
    foreignKey: "sellerId",
    as: "seller"
})
History.belongsTo(Collection)
Collection.hasMany(History)


sequelize.sync()
  .then(() => {
    console.log('Database and tables created!')
    console.log(`App is listening at http://localhost:3000`)
    console.log(`Swagger available at http://localhost:3000/api`)
})

export { User, Team, NFT, Collection, History };