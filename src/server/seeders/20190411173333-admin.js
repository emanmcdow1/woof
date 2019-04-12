'use strict';
const User = require('../models').User;

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert('Users', [{
      fname: 'admin',
      lname: 'admin',
      email: 'admin@admin.com',
      password: 'adm1n'
    },{
      fname: 'admin2',
      lname: 'admin2',
      email: 'admin2@admin.com',
      password: 'adm2n'
    },{
      fname: 'admin3',
      lname: 'admin3',
      email: 'admin3@admin.com',
      password: 'adm3n'
    }])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correnctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('User', null, {});
  }
};
