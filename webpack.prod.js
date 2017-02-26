var path = require('path');
var webpack = require('webpack');
var plugins = require('./webpack.plugins');

var DefinePlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production'),
  },
});
var CommonChunksPlugin = new webpack.optimize.CommonsChunkPlugin({ names: [ 'vendor', 'manifest' ] });
const BabiliPlugin = new (require('babili-webpack-plugin'))();
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = (env) => ({
  entry: [
    'whatwg-fetch',
    'babel-polyfill',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: './'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8081,
    clientLogLevel: 'info'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [ 'react', 'es2015' ]
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64' +
              ':5]'
        }),
      },
      {
        test: /\.scss$/,
        loader: 'style-loader?sourceMap!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64' +
              ':5]!sass-loader',
      }
    ]
  },
  plugins: plugins.concat([
    DefinePlugin,
    new ExtractTextPlugin({ filename: 'app.css', disable: false, allChunks: true }),
    BabiliPlugin,
  ]),
  resolve: {
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat'
    }
  }
});
