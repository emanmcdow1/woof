'use strict'
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Users', {
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
