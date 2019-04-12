'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Files', // name of source model
      'userId',
      {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: "Users",
          key: 'id'
        }
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Files',
      'userId'
    )
  }
};
