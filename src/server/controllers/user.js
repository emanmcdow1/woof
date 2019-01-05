const User = require('../models').User

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

    findUser(req, res) {
        return User
            .findAll({
                where:
                {
                    email: req.params.email
                }
            })
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User not found'
                    });
                }
                return res.status(200).send(user);
            })
            .catch(error => res.status(400).send(error))
    },

    login(req, res) {
        return User
            .findAll({
                where: {
                    email: req.body.email,
                    password: req.body.password
                }
            })
            .then(user => {
                if (user.length > 0) {
                    return res.json({
                        message: 'Successful Login',
                        success: true
                    });
                } else {
                    return res.json({
                        message: 'Unsuccessful Login',
                        success: false
                    });
                }

            })
            .catch(error => {
                console.log(error);
                return res.json({
                    message: 'Console error',
                    success: false
                })
            });
    }
}
