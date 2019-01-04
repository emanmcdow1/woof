const path = require('path');
const User = require('./models/user');
const userController = require('./controllers').users;

module.exports = function routes(app) {
    app.post('/register', userController.create);
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '../../public/index.html'));
    })
}
