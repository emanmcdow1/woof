const User = require('../models').User;

module.exports = {
  create(req, res) {
    return User
    .create({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: req.body.password,
    })
    .then(user => res.status(201).send(user))
    .catch(error => res.status(400).send(error));
  },
  
  destroy(req, res){
    return User
    .findById(req.params.userId)
    .then(user => {
      if(!user){
        return res.status(404).send({
          message: "User Not Found",
        });
      }
      return user
        .destroy()
        .then(() => res.status(204).send())
        .catch((error) => res.status(400).send(error);
    })
    .catch(error => res.status(400).send(error));
  },
};
