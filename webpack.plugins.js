const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = [
    new WriteFilePlugin(),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, 'src/sw.js'),
        to: path.join(__dirname, 'dist/sw.js'),
      },
      {
        from: path.join(__dirname, 'src/cachepolyfill.js'),
        to: path.join(__dirname, 'dist/cachepolyfill.js'),
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
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'webpack-report.html',
      openAnalyzer: false,
      generateStatsFile: true,
      statsFilename: 'webpack-stats.json',
      logLevel: 'info'
    })
]