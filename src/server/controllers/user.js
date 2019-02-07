const User = require('../models').User
const { exec } = require('child_process');
/*const filetree = [
  {"type":"directory","name":"src/server","contents":[
    {"type":"directory","name":"config","contents":[
      {"type":"file","name":"config.json"}
    ]},
    {"type":"directory","name":"controllers","contents":[
      {"type":"file","name":"index.js"},
      {"type":"file","name":"user.js"}
    ]},
    {"type":"file","name":"index.js"},
    {"type":"directory","name":"migrations","contents":[
      {"type":"file","name":"20181231050857-create-user.js"}
    ]},
    {"type":"directory","name":"models","contents":[
      {"type":"file","name":"index.js"},
      {"type":"file","name":"user.js"}
    ]},
    {"type":"file","name":"routes.js"}
  ]},
]*/

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
            .catch(error => res.status(400).send(error))
    },

    destroy(req, res){
        return User
            .findById(req.params.userId)
            .then(user => {
                if(!user){
                    return res.status(404).send({
                        message: "User Not Found",
                    })
                }
                return user
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error))
            })
            .catch(error => res.status(400).send(error))
    },
    list(req, res) {
        return User.findAll()
            .then(users => res.status(200).send(users))
            .catch(error => res.status(400).send(error))
    },
    retrieve(req, res) {
      return User
        .findById(req.params.userId, {})
        .then(user => {
          if(!user){
            return res.status(404).send({
              message: 'User Not Found',
            });
          }
          return res.status(200).send(user)
        })
        .catch(error => res.status(400).send(error));
    },
    getTree(req, res){
        return User
          .findById(req.params.userId)
          .directory
    }
}
