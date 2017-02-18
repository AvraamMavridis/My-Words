var Webpack = require('webpack');
var path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var DefinePlugin = new Webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production'),
  },
});
var UglifyPlugin = new Webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }});
var CommonChunksPlugin = new Webpack.optimize.CommonsChunkPlugin({ names: ['vendor', 'manifest']});
const ExtractText = new ExtractTextPlugin({filename: 'app.css', disable: false, allChunks: true});
const BabiliPlugin = new (require('babili-webpack-plugin'))();


module.exports = (env) => ({
  entry: [
    'babel-core/register',
    'babel-polyfill',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
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
  plugins: [ExtractText, DefinePlugin, BabiliPlugin],
  'resolve': {
    'alias': {
      'react': 'preact-compat',
      'react-dom': 'preact-compat'
    }
  }
});