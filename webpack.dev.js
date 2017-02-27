var path = require('path');
var webpack = require('webpack');
var plugins = require('./webpack.plugins');

module.exports = function (env) {
  return {
    devtool: 'source-map',
    entry: [
      'whatwg-fetch',
      'babel-polyfill',
      './src/index'
    ],
    performance: {
      hints: 'warning'
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: './'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ].concat(plugins),
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000,
      clientLogLevel: 'info'
    },
    stats: {
      // Remove built modules information.
      modules: true,
      // Remove built modules information to chunk information.
      chunkModules: true,
      colors: true
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loaders: [
            'react-hot-loader', 'babel-loader'
          ],
          include: path.join(__dirname, 'src')
        }, {
          test: /\.scss$/,
          loader: 'style-loader?sourceMap!css-loader?modules&importLoaders=1&localIdentName=[name]_' +
              '_[local]___[hash:base64:5]!sass-loader'
        }, {
          test: /\.html$/,
          use: {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          loaders: [
            'file-loader',
            {
              loader: 'image-webpack-loader',
              query: {
                progressive: true,
                optimizationLevel: 7,
                interlaced: false,
                pngquant: {
                  quality: '65-90',
                  speed: 4
                }
              }
            }
          ]
        }
      ]
    },
    resolve: {
      alias: {
        react: 'preact-compat',
        'react-dom': 'preact-compat'
      }
    }
  };
};
