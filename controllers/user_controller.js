const { User } = require('../sequelize/sequelize')

const addUser = async (req, res) => {

    var user = {
        role: "admin",
        name: "name adm",
        email: "admin@dotnet.fr",
    }
    User.create(user);
    return res.status(200).send("OK");
}

module.exports = {
    addUser
}