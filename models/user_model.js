module.exports = (sequelize, type) => {
    return sequelize.define('Users', {
        id: {
            type: type.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        address: {
            type: type.STRING,
            validate: {
                is: /^0x[a-fA-F0-9]{40}$/,
            },
            allowNull: false,
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
        },
        password: {
            type: type.STRING,
            allowNull: false,
        },
    });
}