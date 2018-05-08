const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    main: './src/index.js'
  },
  devtool: 'cheap-eval-source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      }
    ]
  }
}
