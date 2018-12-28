const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const outputDirectory = 'dist';

module.exports = {
  entry: ['babel-polyfill', './src/client/index.js'],
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [{loader: 'style-loader'}, {loader: "css-loader", options: {modules: true}}]
      },
      {
        test: /\.less/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'less-loader', options: { javascriptEnabled: true } }]
      },
      {
        test: /\.(jpe?g|gif|png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.less', '.css'],
    modules: ['node_modules']
  },
  devServer: {
    contentBase: 'public',
    hot: true,
    historyApiFallback: true
  },
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico'
    })
  ]
};
