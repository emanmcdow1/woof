'use strict'
const bcrypt = require('bcrypt');
const abspath = '/srv/woof_web';
const path = require('path');
const { exec } = require('child_process');


module.exports = (sequelize, DataTypes) => {
    const File = sequelize.define('File', {
        id:{
          allowNull: false,
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4
        },
        name:{
          type: DataTypes.STRING,
        },
        location:{
          type: DataTypes.STRING,
        },
        extension:{
          type: DataTypes.STRING,
        }
    }, {
        hooks: {
            beforeSave: (file) => {
              file.name = path.basename(file.location);
              file.extension = path.extname(file.location);
            },
        },
        instanceMethods: {

        },
    }, {})
    File.associate = function(models) {
      File.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      })
    }
    return File
}
