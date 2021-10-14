const Sequelize = require('sequelize')
const UserModel = require('../models/user_model')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

const User = UserModel(sequelize, Sequelize)

// Attention ENLEVER LE FORCE TRUC QUI ERASE LES TABLES A CHAQUE STARTUP
sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
})

module.exports = {
  User,
}
