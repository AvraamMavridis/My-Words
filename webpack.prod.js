var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var DefinePlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production'),
  },
});
const HtmlWebpackPlugin = require('html-webpack-plugin');
var CommonChunksPlugin = new webpack.optimize.CommonsChunkPlugin({ names: ['vendor', 'manifest']});
const combineLoaders = require('webpack-combine-loaders');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BabiliPlugin = new (require('babili-webpack-plugin'))();
const WriteFilePlugin = require('write-file-webpack-plugin');


module.exports = (env) => ({
  entry: [
    'babel-core/register',
    'babel-polyfill',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[hash].bundle.js',
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
  plugins: [
      new WriteFilePlugin(),
      new CopyWebpackPlugin([
        {
          from: path.join(__dirname, 'src/sw.js'),
          to: path.join(__dirname, 'dist/sw.js'),
        },
        {
          from: path.join(__dirname, './manifest.webmanifest'),
          to: path.join(__dirname, 'dist/manifest.webmanifest'),
        },
        {
          from: path.join(__dirname, './assets/icons'),
          to: path.join(__dirname, 'dist'),
        },
      ]),
      new HtmlWebpackPlugin({template: './index.html'}),
      new webpack.HotModuleReplacementPlugin(),
      new ExtractTextPlugin({filename: '[hash].app.css', disable: false, allChunks: true}),
      BabiliPlugin,
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'webpack-report.html',
        openAnalyzer: false,
        generateStatsFile: true,
        statsFilename: 'webpack-stats.json',
        logLevel: 'info'
      }),
  ],
  'resolve': {
    'alias': {
      'react': 'preact-compat',
      'react-dom': 'preact-compat'
    }
  }
});