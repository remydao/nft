module.exports = (sequelize, type) => {
    return sequelize.define('Users', {
        id: {
            type: type.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        role: {
            type: type.STRING,
            allowNull: false,
        },
        name: {
            type: type.STRING,
            allowNull: false,
        },
        email: {
            type: type.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        }
    });
}