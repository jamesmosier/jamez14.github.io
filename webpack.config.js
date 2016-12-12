const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname + '/src',

  devtool: 'source-map',

  entry: {
    app: './js/app.js',
    style: './sass/app.scss',
  },

  output: {
    filename: '[name].bundle.js',
    path: __dirname + '/dist/assets',
    publicPath: '/assets',
  },

  devServer: {
    contentBase: __dirname + '/src',
  },

  module: {
    loaders: [{
      test: /\.scss$/,
      loader:  ExtractTextPlugin.extract({
        loader: 'css-loader?importLoaders=1!sass-loader',
      })
    }]
  },

  plugins: [
    new ExtractTextPlugin({
      filename: "[name].bundle.css",
      allChunks: true,
    }),
  ],
};
