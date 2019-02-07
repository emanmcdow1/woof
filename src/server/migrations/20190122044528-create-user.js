'use strict'
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            fname: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            lname: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: true,
                validate:{
                    isEmail: true,
                },
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING
            },
            directory: {
                type: Sequelize.STRING,
                unique: true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Users')
    }
}
