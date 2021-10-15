import { Sequelize } from "sequelize";
import { userModel } from '../models/user-model';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

// All models are defined here
const User = sequelize.define('User', userModel);

// Attention ENLEVER LE FORCE QUI ERASE LES TABLES A CHAQUE STARTUP
sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
})

export { User };