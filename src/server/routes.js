const path = require('path');
const User = require('./models/user');
const userController = require('./controllers').users;

module.exports = function routes(app) {
    app.post('/register', userController.create);
    app.get('/dashboard/:user', userController.getTree);
    app.get('/users', userController.list);
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '../../public/index.html'));
    })
}
