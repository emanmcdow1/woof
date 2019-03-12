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
        directory:{
            type: DataTypes.STRING,
            unique: true
        },
    },/* {
        hooks: {
            beforeSave: () => {

            },
        },
        instanceMethods: {

        },
    }, */{})
    return File
}
