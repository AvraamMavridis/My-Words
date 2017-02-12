var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const combineLoaders = require('webpack-combine-loaders');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client', './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({filename: '/static/app.css', disable: false, allChunks: true})
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [
          'react-hot-loader', 'babel-loader'
        ],
        include: path.join(__dirname, 'src')
      }, {
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
  }
};
