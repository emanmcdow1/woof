const File = require('../models').File
const { exec } = require('child_process');

module.exports = {
  create(req, res) {
    return File
    .create({
      name: req.body.name,
      location: req.body.location,
      userId: req.body.userId,
      extension: req.body.extension
    })
    .then(user => res.status(201).send(user))
    .catch(error => res.status(400).send(error))
  },

}
