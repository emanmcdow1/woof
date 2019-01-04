const path = require('path');
const User = require('./models/user');
const userController = require('./controllers').users;

//*** Routes ***//
app.route('/api/login', sessionChecker, (req,res) => {

});

app.route('/api/register', sessionChecker, (req,res) => {

});
