'use strict'
const bcrypt = require('bcrypt');
const abspath = '/srv/woof_web';
const path = require('path');
const { exec } = require('child_process');


module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        fname:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        lname:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                isEmail: true,
            },
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        directory:{
            type: DataTypes.STRING,
            unique: true
        },
    }, {
        hooks: {
            beforeCreate: (user) => {
                const salt = bcrypt.genSaltSync()
                user.password = bcrypt.hashSync(user.password, salt)
            },
            afterCreate: (user) => {
              user.directory = path.join(abspath, user.id.toString());
              exec(`mkdir ${user.directory}`, (error, stdout, stderr) => {
                if(error){
                  console.error(`exec error: ${error}`);
                  return;
                }
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);

              });
            }
        },
        instanceMethods: {
            validPassword: function(password) {
                return bcrypt.compareSync(password, this.password)
            }
        },
    }, {})
    User.associate = function(models) {
    // associations can be defined here
    }
    return User
}
