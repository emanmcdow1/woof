const File = require('../models').File
const { exec } = require('child_process');

module.exports = {
  create(req, res) {
    return File
    .create({
      location: req.body.location,
      userId: req.body.userId,
    })
    .then(user => res.status(201).send(user))
    .catch(error => res.status(400).send(error))
  },

  findOrCreate(req, res){
    return File
    .findOrCreate({where:{
      location: req.body.location,
      userId: req.body.userId,
    }})
    .then(([file, created]) => {
      console.log(file.get({
        plain: true
      }))
      if(created){
        console.log("File added to database");
      }else{
        console.log("File found in database");
      }
    })
    .then(file => res.status(201).send(file))
    .catch(error => res.status(400).send(error))
  },

  findById(req, res){
    return File
    .findAll({where:{userId: req.body.userId}})
    .then(files => {
      res.status(200).send(files)
    })
    .catch(error => res.status(400).send(error))
  }

}
