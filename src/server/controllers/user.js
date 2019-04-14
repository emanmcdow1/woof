const User = require('../models').User;
const { exec } = require('child_process');
const File = require('../models').File;
const fileController = require('../controllers').files

function treeUpdate(branch, user){
  return (branch.map((tree) => {
    if(tree.type === "directory" && tree.type != "report"){
      treeUpdate(tree.contents, user)
      console.log("Yeet")
      File.findOrCreate({
        where:{
          userId: user.id,
          location: tree.name
        }
      })
    }
    else if(tree.type != "report"){
      console.log("Yeet")
      File.findOrCreate({
        where:{
          userId: user.id,
          location: tree.name
        },
        defaults:{
          userId: user.id,
          location: tree.name
        }
      })
    }
  }));
};

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
          .then(user => {
            exec(`tree ${user.directory} -J --noreport`, (error, stdout, stderr) => {
              if(error){
                return res.status(400).send(error);
              }
              console.log(user.directory);
              return res.status(200).send(stdout);
            });
          })
          .catch(error => res.status(400).send(error));
    },
    updateFiles(req,res){
      return User
      .findById(req.body.userId)
      .then((user) => {
        exec(`tree ${user.directory} -Jf --noreport`, (error, stdout, stderr) => {
          if(error){
            return res.status(400).send(error);
          }
          var branch = JSON.parse(stdout)
          treeUpdate(branch, user);
          return res.status(200).send();
        })
      })
    },
    verify(req, res){
      return User
      .findOne({where:
        email: req.body.email
      })
      .then(user => {
        if(user.validPassword(req.body.password)){
          return res.status(200).send({success: 'true'})
        }else{
          return res.status(401).send()
        }
      })
      .catch(error => res.status(404).send(error))

    }
}
