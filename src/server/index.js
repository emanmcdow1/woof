const Express = require('express');
const path = require('path');


const app = new Express();

const isDevMode = process.env.NODE_ENV === 'development' || false;
const PORT = process.env.PORT || 3000;

if (isDevMode) {
    const webpack = require('webpack');
    const config = require('../webpack.config');
    const webpackDevMiddleware = require('webpack-dev-middleware'); //eslint-disable-line
    const webpackHotMiddleware = require('webpack-hot-middleware'); //eslint-disable-line
    const compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath,
        watchOptions: {
            poll: 1000
        },
    }));
    app.use(webpackHotMiddleware(compiler));
}

app.use(Express.json());

require('./routes')(app);

app.listen(PORT, error => {
    if (!error) {
        console.log(`Woof is running on port ${PORT}! Load http://localhost:${PORT} in your browser.`)
    }
});

module.exports = app;
