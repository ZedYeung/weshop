// old
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require("babel-register");

// new
// import path from 'path';
// import HtmlWebpackPlugin from 'html-webpack-plugin';
console.log(__dirname)

// Webpack Configuration
const config = {
  // Entry
  entry: {
    main: './src/index.js',
  },
  // Output
  output: {
    path: path.resolve('./dist'),
    filename: '[name].[hash].js',
  },
  // Loaders
  module: {
    rules : [
      // JavaScript/JSX Files
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      // CSS Files
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ['file-loader']
      }
    ]
  },
  // Plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      hash: true
    }),
    new CleanWebpackPlugin(['dist'])
  ],
  devServer: {
    host: 'localhost',
    port: 3000,
    open: true,
  },
  // OPTIONAL
  // Reload On File Change
  watch: true,
  // Development Tools (Map Errors To Source File)
  devtool: 'source-map',
};
// Exports
module.exports = config;