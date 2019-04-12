'use strict'
const bcrypt = require('bcrypt');
const abspath = '/srv/woof_web';
const path = require('path');
const { exec } = require('child_process');


module.exports = (sequelize, DataTypes) => {
    const File = sequelize.define('File', {

        name:{
          type: DataTypes.STRING,
        },
        location:{
          type: DataTypes.STRING,
        },
        userId:{
          type: DataTypes.INTEGER,
          allowNull: false;
        },
        extension:{
          type: DataTypes.STRING;
        }
    },/* {
        hooks: {
            beforeSave: () => {

            },
        },
        instanceMethods: {

        },
    }, */{})
    File.associate = function(models) {
      File.belongsTo(models.User, {
        as: 'user',
        foreignKey: "fileId"
      })
    }
    return File
}
