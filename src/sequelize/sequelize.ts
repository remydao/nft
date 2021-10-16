import { Sequelize } from "sequelize";
import { teamModel } from "../models/team-model";
import { userModel } from '../models/user-model';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

// All models are defined here
const User = sequelize.define('User', userModel);
const Team = sequelize.define('Team', teamModel);

Team.hasMany(User, { as: "users" });
User.belongsTo(Team, {
  foreignKey: "TeamId",
  as: "team",
});

// Attention ENLEVER LE FORCE QUI ERASE LES TABLES A CHAQUE STARTUP
sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
})

export { User, Team };