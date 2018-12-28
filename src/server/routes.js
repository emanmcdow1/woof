const path = require('path');
const api = require('./api');

module.exports = function routes(app) {
    app.post('api/login', api.logIn);
    app.post('api/register', api.register);

    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '../../public/index.html'))
    });
};

