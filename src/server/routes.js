const path = require('path');
const userController = require('./controllers').users;

module.exports = function routes(app) {
    app.post('/register', userController.create);
    app.post('/login', userController.login);
    app.get('/user/:email', userController.findUser);
    app.get('/users', userController.list);
    app.get('/delete/:userId', userController.destroy);
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '../../public/index.html'));
    });
};
