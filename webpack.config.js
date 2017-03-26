const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    './index.js',
    'babel-polyfill'
  ],
  output: {
    filename: 'bundle.js',
    // the output bundle

    path: path.join(__dirname, 'dist'),

    publicPath: '/static/'
    // necessary for HMR to know where to load the hot update chunks
  },

  context: path.join(__dirname, 'src'),

  devtool: 'cheap-module-eval-source-map',

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
    // prints more readable module names in the browser console on HMR updates
  ],
};